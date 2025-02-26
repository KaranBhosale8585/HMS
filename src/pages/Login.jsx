import { useState, useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { Eye, EyeOff, Loader2 } from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const Login = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Handle Form Submission
  const handleLogin = useCallback(
    async (e) => {
      e.preventDefault();

      // Prevent login if fields are empty
      if (!email.trim() || !password.trim()) {
        toast.error("Please enter both email and password.");
        return;
      }

      setLoading(true);

      try {
        const { data } = await axios.post(
          `${API_URL}/auth/login`,
          { email: email.trim(), password: password.trim() },
          { withCredentials: true }
        );

        toast.success("Login successful!");
        setUser(data.user);

        // Redirect based on user role
        setTimeout(() => {
          navigate(data.user.isAdmin ? "/admin" : "/home", { replace: true });
        }, 500);
      } catch (error) {
        console.error("Login Error:", error.response?.data || error.message);

        // Handle Different Error Cases
        if (!error.response) {
          toast.error("Network error. Please check your connection.");
        } else if (error.response.status === 401) {
          toast.error("Invalid email or password.");
        } else {
          toast.error(
            error.response.data?.message || "Login failed. Try again."
          );
        }
      } finally {
        setLoading(false);
      }
    },
    [email, password, navigate, setUser]
  );

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-blue-600 dark:text-blue-400 text-center">
          Welcome Back
        </h2>

        <form onSubmit={handleLogin} className="space-y-4 mt-6">
          {/* Email Field */}
          <div>
            <label className="block text-gray-600 dark:text-gray-300 text-sm mb-1">
              Email Address
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
              autoComplete="email"
              disabled={loading}
            />
          </div>

          {/* Password Field with Toggle */}
          <div>
            <label className="block text-gray-600 dark:text-gray-300 text-sm mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
                autoComplete="current-password"
                disabled={loading}
              />
              <button
                type="button"
                className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-gray-700"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                disabled={loading}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 flex items-center justify-center rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading}
            aria-disabled={loading}
          >
            {loading ? <Loader2 size={20} className="animate-spin" /> : "Login"}
          </button>
        </form>

        {/* Signup Redirect */}
        <p className="text-center text-gray-600 dark:text-gray-400 mt-4">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-500 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
