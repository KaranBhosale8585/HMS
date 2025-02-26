import { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [responseMessage, setResponseMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Use API URL from .env or fallback to localhost
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      setResponseMessage(result.message || "Message sent successfully!");
      if (response.ok) setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      setResponseMessage("Something went wrong! Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 w-full max-w-3xl">
        <h2 className="text-3xl font-bold text-blue-600 dark:text-blue-400 text-center">
          Contact Us
        </h2>
        <p className="text-gray-600 dark:text-gray-300 text-center mb-6">
          Feel free to reach out to us!
        </p>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {[
            {
              label: "Full Name",
              name: "name",
              type: "text",
              placeholder: "Enter your name",
            },
            {
              label: "Email Address",
              name: "email",
              type: "email",
              placeholder: "Enter your email",
            },
          ].map((input, index) => (
            <div key={index}>
              <label className="block text-gray-700 dark:text-gray-200 font-semibold">
                {input.label}
              </label>
              <input
                type={input.type}
                name={input.name}
                value={formData[input.name]}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-400 dark:bg-gray-600 dark:text-white"
                placeholder={input.placeholder}
              />
            </div>
          ))}

          <div>
            <label className="block text-gray-700 dark:text-gray-200 font-semibold">
              Message
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="4"
              required
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-400 dark:bg-gray-600 dark:text-white"
              placeholder="Type your message..."
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition flex justify-center"
            disabled={loading}
          >
            {loading ? (
              <span className="animate-spin border-2 border-white border-t-transparent rounded-full h-5 w-5"></span>
            ) : (
              "Send Message"
            )}
          </button>
        </form>

        {responseMessage && (
          <p className="text-center mt-4 text-green-600 dark:text-green-400">
            {responseMessage}
          </p>
        )}
      </div>
    </div>
  );
};

export default Contact;
