import React from "react";
import { useState, useCallback, useMemo } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import "react-toastify/dist/ReactToastify.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

// Utility Functions
const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const validatePassword = (password) => {
  return {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
    specialChar: /[^A-Za-z0-9]/.test(password),
  };
};

// Password Input Component
const PasswordField = React.memo(
  ({ label, name, value, onChange, disabled }) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          name={name}
          placeholder={label}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          value={value}
          onChange={onChange}
          required
          disabled={disabled}
          autoComplete="new-password"
        />
        <button
          type="button"
          className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-gray-700"
          onClick={() => setShowPassword(!showPassword)}
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>
    );
  }
);

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [passwordErrors, setPasswordErrors] = useState({});

  // Handle Input Change
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value.trim() }));

    if (name === "password") {
      setPasswordErrors(validatePassword(value));
    }
  }, []);

  // Validate Form Fields
  const isPasswordValid = useMemo(() => {
    return Object.values(passwordErrors).every(Boolean);
  }, [passwordErrors]);

  // Handle Form Submission
  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      const { name, email, password, confirmPassword } = formData;

      if (!name || !email || !password || !confirmPassword) {
        toast.error("All fields are required.");
        return;
      }
      if (!validateEmail(email)) {
        toast.error("Please enter a valid email address.");
        return;
      }
      if (password !== confirmPassword) {
        toast.error("Passwords do not match.");
        return;
      }
      if (!isPasswordValid) {
        toast.error("Password does not meet security requirements.");
        return;
      }

      setLoading(true);

      try {
        const response = await axios.post(
          `${API_URL}/auth/signup`,
          { name, email, password },
          { withCredentials: true }
        );

        toast.success(response.data.message || "Signup successful!");
        navigate("/login");
      } catch (error) {
        console.error("Signup Error:", error.response?.data || error.message);

        if (
          error.response?.status === 400 &&
          error.response?.data?.message === "Email already in use"
        ) {
          toast.error("This email is already registered. Try logging in.");
        } else {
          toast.error(
            error.response?.data?.message || "Signup failed. Try again."
          );
        }
      } finally {
        setLoading(false);
      }
    },
    [formData, isPasswordValid, navigate]
  );

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-blue-600 dark:text-blue-400 text-center">
          Create Your Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4 mt-6">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            value={formData.name}
            onChange={handleChange}
            required
            autoComplete="name"
            disabled={loading}
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            value={formData.email}
            onChange={handleChange}
            required
            autoComplete="email"
            disabled={loading}
          />

          <PasswordField
            label="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            disabled={loading}
          />
          <PasswordField
            label="Confirm Password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            disabled={loading}
          />

          <div className="text-sm text-gray-500 dark:text-gray-400">
            <p>Password must include:</p>
            <ul className="list-disc pl-4">
              <li
                className={
                  passwordErrors.length ? "text-green-500" : "text-red-500"
                }
              >
                At least 8 characters
              </li>
              <li
                className={
                  passwordErrors.uppercase ? "text-green-500" : "text-red-500"
                }
              >
                An uppercase letter
              </li>
              <li
                className={
                  passwordErrors.lowercase ? "text-green-500" : "text-red-500"
                }
              >
                A lowercase letter
              </li>
              <li
                className={
                  passwordErrors.number ? "text-green-500" : "text-red-500"
                }
              >
                A number
              </li>
              <li
                className={
                  passwordErrors.specialChar ? "text-green-500" : "text-red-500"
                }
              >
                A special character
              </li>
            </ul>
          </div>

          <button
            type="submit"
            className="w-full py-3 flex items-center justify-center rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? (
              <Loader2 size={20} className="animate-spin" />
            ) : (
              "Sign Up"
            )}
          </button>
        </form>

        <p className="text-center text-gray-600 dark:text-gray-400 mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
