import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Apply from "./pages/Apply";
import Home from "./pages/Home";
import Rooms from "./pages/Rooms";
import Complaint from "./pages/Complaint";
import Contact from "./pages/Contact";
import Events from "./pages/Events";
import Facilities from "./pages/Facilities";
import EventRegistration from "./pages/EventRegistration";
import Mess from "./pages/Mess";
import About from "./components/About";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AdminDashboard from "./pages/AdminDashboard";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const getToken = () => {
  const match = document.cookie.match(/(^| )token=([^;]+)/);
  return match ? match[2] : null;
};

const AppWrapper = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const token = getToken();
      if (token) {
        const decoded = jwtDecode(token);
        if (decoded.exp * 1000 > Date.now()) {
          setUser(decoded);
        } else {
          document.cookie =
            "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
          setUser(null);
        }
      }
    } catch (error) {
      console.error("Token error:", error);
      setUser(null);
    }
  }, []);

  const handleLogout = async () => {
    try {
      const response = await fetch(`${API_URL}/auth/logout`, {
        method: "POST",
        credentials: "include",
      });

      if (response.ok) {
        document.cookie =
          "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        setUser(null);
        navigate("/");
      }
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  return <App user={user} setUser={setUser} handleLogout={handleLogout} />;
};

const App = ({ user, setUser, handleLogout }) => {
  const location = useLocation();
  const isAdminPage = location.pathname === "/admin";

  return (
    <>
      {!isAdminPage && <Navbar user={user} onLogout={handleLogout} />}

      <Routes>
        <Route
          path="/"
          element={
            user ? <Navigate to="/home" replace /> : <Login setUser={setUser} />
          }
        />
        <Route
          path="/signup"
          element={user ? <Navigate to="/home" replace /> : <Signup />}
        />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />

        {user ? (
          <>
            <Route path="/home" element={<Home />} />
            <Route path="/apply" element={<Apply />} />
            <Route path="/rooms" element={<Rooms />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/complaint" element={<Complaint />} />
            <Route path="/events" element={<Events />} />
            <Route path="/facilities" element={<Facilities />} />
            <Route path="/event-registration" element={<EventRegistration />} />
            <Route path="/mess" element={<Mess />} />
            <Route path="/about" element={<About />} />
          </>
        ) : (
          <Route path="/*" element={<Navigate to="/" replace />} />
        )}

        <Route
          path="/admin"
          element={
            user?.isAdmin ? <AdminDashboard /> : <Navigate to="/" replace />
          }
        />
      </Routes>

      {!isAdminPage && <Footer />}
    </>
  );
};

const MainApp = () => (
  <Router>
    <AppWrapper />
  </Router>
);

export default MainApp;
