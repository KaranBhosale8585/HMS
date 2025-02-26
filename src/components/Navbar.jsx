import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = ({ user, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const menuRef = useRef(null);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md transition">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/home"
          className="text-2xl font-bold text-blue-600 dark:text-blue-400"
        >
          HMS
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6">
          {[
            "Home",
            "Rooms",
            "Facilities",
            "Mess",
            "Events",
            "Contact",
            "About",
          ].map((item) => (
            <li key={item}>
              <Link
                to={`/${item.toLowerCase()}`}
                className={`hover:text-blue-600 dark:hover:text-blue-400 text-gray-700 dark:text-gray-300 transition ${
                  location.pathname === `/${item.toLowerCase()}`
                    ? "font-semibold text-blue-600 dark:text-blue-400"
                    : ""
                }`}
              >
                {item}
              </Link>
            </li>
          ))}
        </ul>

        {/* Actions */}
        <div className="hidden md:flex space-x-4 items-center">
          <Link
            to="/complaint"
            className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition"
          >
            File a Complaint
          </Link>
          {!user ? (
            <Link
              to="/"
              className="border px-4 py-2 rounded-lg text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-gray-700 transition"
            >
              Login
            </Link>
          ) : (
            <button
              onClick={onLogout}
              className="border px-4 py-2 rounded-lg text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-gray-700 transition"
            >
              Log Out
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          aria-label="Toggle menu"
          className="md:hidden text-2xl text-gray-700 dark:text-gray-300"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? "✖️" : "☰"}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        ref={menuRef}
        className={`md:hidden bg-white dark:bg-gray-800 shadow-md transition-all overflow-hidden ${
          isOpen ? "max-h-screen opacity-100 py-4" : "max-h-0 opacity-0 py-0"
        }`}
      >
        <ul className="text-center space-y-2">
          {[
            "Home",
            "Rooms",
            "Facilities",
            "Mess",
            "Events",
            "Contact",
            "About",
            "Complaint",
          ].map((item) => (
            <li key={item}>
              <Link
                to={`/${item.toLowerCase()}`}
                className={`block py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition ${
                  location.pathname === `/${item.toLowerCase()}`
                    ? "font-semibold text-blue-600 dark:text-blue-400"
                    : ""
                }`}
                onClick={() => setIsOpen(false)}
              >
                {item}
              </Link>
            </li>
          ))}
          {!user ? (
            <li>
              <Link
                to="/login"
                className="block py-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-500 transition"
                onClick={() => setIsOpen(false)}
              >
                Login
              </Link>
            </li>
          ) : (
            <li>
              <button
                onClick={() => {
                  setIsOpen(false);
                  onLogout();
                }}
                className="block w-full text-center py-2 text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-500 transition"
              >
                Log Out
              </button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
