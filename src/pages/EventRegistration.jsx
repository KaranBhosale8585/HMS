import { useState } from "react";

const EventRegistration = () => {
  // API Base URL from environment variable
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  // Form State
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    gender: "",
    eventType: "",
    comment: "",
  });

  const [responseMessage, setResponseMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResponseMessage("");

    try {
      const response = await fetch(`${API_URL}/register-event`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setResponseMessage(result.message);
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          gender: "",
          eventType: "",
          comment: "",
        });
      } else {
        setResponseMessage(result.error || "Something went wrong!");
      }
    } catch (error) {
      setResponseMessage("Network error! Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 dark:from-gray-900 dark:to-gray-800 px-4">
      <section className="bg-white/80 dark:bg-gray-800/80 shadow-2xl backdrop-blur-lg rounded-lg p-8 w-full max-w-lg border border-gray-200 dark:border-gray-700">
        <h2 className="text-4xl font-bold text-blue-600 dark:text-blue-400 text-center mb-4">
          Event Registration
        </h2>
        <p className="text-gray-600 dark:text-gray-300 text-center mb-6">
          Fill in the details below to register.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {[
            {
              label: "Full Name",
              name: "fullName",
              type: "text",
              placeholder: "Enter your full name",
            },
            {
              label: "Email Address",
              name: "email",
              type: "email",
              placeholder: "Enter your email",
            },
            {
              label: "Phone Number",
              name: "phone",
              type: "tel",
              placeholder: "Enter your phone number",
            },
          ].map(({ label, name, type, placeholder }) => (
            <div key={name}>
              <label className="block font-semibold text-gray-700 dark:text-gray-300">
                {label}:
              </label>
              <input
                type={type}
                name={name}
                value={formData[name]}
                onChange={handleChange}
                required
                placeholder={placeholder}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:text-white transition"
              />
            </div>
          ))}

          {[
            {
              label: "Gender",
              name: "gender",
              options: ["Male", "Female", "Other"],
            },
            {
              label: "Event Type",
              name: "eventType",
              options: [
                "Cultural Night",
                "Sports Meet",
                "Academic Quiz",
                "Tech Symposium",
                "Annual Festival",
              ],
            },
          ].map(({ label, name, options }) => (
            <div key={name}>
              <label className="block font-semibold text-gray-700 dark:text-gray-300">
                {label}:
              </label>
              <select
                name={name}
                value={formData[name]}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:text-white transition"
              >
                <option value="" disabled>
                  Select {label}
                </option>
                {options.map((option) => (
                  <option key={option} value={option.toLowerCase()}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          ))}

          <div>
            <label className="block font-semibold text-gray-700 dark:text-gray-300">
              Additional Comments:
            </label>
            <textarea
              name="comment"
              value={formData.comment}
              onChange={handleChange}
              rows="3"
              placeholder="Any additional information?"
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:text-white transition"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition flex justify-center"
            disabled={loading}
          >
            {loading ? (
              <span className="animate-spin border-2 border-white border-t-transparent rounded-full h-5 w-5"></span>
            ) : (
              "Register"
            )}
          </button>
        </form>

        {responseMessage && (
          <p
            className={`text-center mt-4 text-lg font-semibold ${
              responseMessage.includes("Successful")
                ? "text-green-600 dark:text-green-400"
                : "text-red-600 dark:text-red-400"
            }`}
          >
            {responseMessage}
          </p>
        )}
      </section>
    </div>
  );
};

export default EventRegistration;
