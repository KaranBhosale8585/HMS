import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const Apply = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    gender: "",
    dob: "",
    contactNumber: "",
    email: "",
    address: "",
    course: "",
    guardianName: "",
    guardianContact: "",
    roomPreference: "",
    documents: null,
  });

  const [fileName, setFileName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file" && files.length > 0) {
      setFormData((prevData) => ({ ...prevData, [name]: files[0] }));
      setFileName(files[0].name);
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const submitData = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      submitData.append(key, value);
    });

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/apply`, {
        method: "POST",
        body: submitData,
      });

      const result = await response.json();

      if (response.ok) {
        toast.success(result.message || "Application submitted successfully!");
        setFormData({
          fullName: "",
          gender: "",
          dob: "",
          contactNumber: "",
          email: "",
          address: "",
          course: "",
          guardianName: "",
          guardianContact: "",
          roomPreference: "",
          documents: null,
        });
        setFileName("");
      } else {
        toast.error(result.error || "Failed to submit application.");
      }
    } catch (error) {
      toast.error("An error occurred while submitting the application.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 px-4">
      <section className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 w-full max-w-2xl">
        <h2 className="text-3xl font-bold text-blue-600 dark:text-blue-400 text-center mb-6">
          Hostel Application Form
        </h2>

        <form onSubmit={handleSubmit} className="grid gap-5">
          {[
            "fullName",
            "dob",
            "contactNumber",
            "email",
            "address",
            "course",
            "guardianName",
            "guardianContact",
          ].map((name) => (
            <div key={name} className="flex flex-col">
              <label
                className="font-medium text-gray-700 dark:text-gray-300"
                htmlFor={name}
              >
                {name.replace(/([A-Z])/g, " $1").trim()}:
              </label>
              <input
                type={name === "dob" ? "date" : "text"}
                id={name}
                name={name}
                value={formData[name]}
                onChange={handleChange}
                required
                className="border p-2 rounded-md dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-400 transition"
              />
            </div>
          ))}

          <div className="flex flex-col">
            <label className="font-medium text-gray-700 dark:text-gray-300">
              Gender:
            </label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
              className="border p-2 rounded-md dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-400"
            >
              <option value="">Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label className="font-medium text-gray-700 dark:text-gray-300">
              Room Preference:
            </label>
            <select
              name="roomPreference"
              value={formData.roomPreference}
              onChange={handleChange}
              required
              className="border p-2 rounded-md dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-400"
            >
              <option value="">Select Room Preference</option>
              <option value="single">Single</option>
              <option value="shared">Shared</option>
              <option value="premium">Premium</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label className="font-medium text-gray-700 dark:text-gray-300">
              Upload Documents:
            </label>
            <input
              type="file"
              name="documents"
              accept=".pdf,.jpg,.png,.jpeg"
              onChange={handleChange}
              required
              className="border p-2 rounded-md dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-400"
            />
            {fileName && (
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Selected: <span className="font-semibold">{fileName}</span>
              </p>
            )}
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition flex justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? (
              <span className="animate-spin border-2 border-white border-t-transparent rounded-full h-5 w-5"></span>
            ) : (
              "Submit Application"
            )}
          </button>
        </form>
      </section>
      <Toaster />
    </main>
  );
};

export default Apply;
