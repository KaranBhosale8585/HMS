import { useState } from "react";

const Complaint = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    complaintType: "general",
    description: "",
  });

  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if (!formData.name.trim()) return "Name is required.";
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email))
      return "Valid email is required.";
    if (!formData.description.trim())
      return "Complaint description is required.";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    setError("");
    setResponseMessage("");

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/complaints`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        setResponseMessage("Complaint submitted successfully!");
        setFormData({
          name: "",
          email: "",
          complaintType: "general",
          description: "",
        });
      } else {
        throw new Error("Error submitting complaint. Please try again.");
      }
    } catch (error) {
      setError(error.message || "An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 dark:from-gray-900 dark:to-gray-800">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 w-full max-w-2xl">
        <h2 className="text-3xl font-bold text-blue-600 dark:text-blue-400 text-center">
          File a Complaint
        </h2>
        <p className="text-gray-600 dark:text-gray-300 text-center mb-4">
          Please fill out the form below.
        </p>

        {error && <p className="text-red-500 text-center">{error}</p>}
        {responseMessage && (
          <p className="text-green-500 text-center">{responseMessage}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {["name", "email"].map((field, index) => (
            <div key={index}>
              <label className="block font-semibold text-gray-700 dark:text-gray-300 capitalize">
                {field}:
              </label>
              <input
                type={field === "email" ? "email" : "text"}
                name={field}
                value={formData[field]}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:text-white"
                placeholder={`Enter your ${field}`}
              />
            </div>
          ))}

          <div>
            <label className="block font-semibold text-gray-700 dark:text-gray-300">
              Complaint Type:
            </label>
            <select
              name="complaintType"
              value={formData.complaintType}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:text-white"
            >
              <option value="general">General Issue</option>
              <option value="maintenance">Maintenance</option>
              <option value="mess">Mess Issue</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold text-gray-700 dark:text-gray-300">
              Complaint Description:
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows="5"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:text-white"
              placeholder="Describe your issue in detail"
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
              "Submit Complaint"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Complaint;
