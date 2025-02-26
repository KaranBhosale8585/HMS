import React, { useState, useEffect } from "react";

const AdminDashboard = () => {
  const [selectedTab, setSelectedTab] = useState(null);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (selectedTab) {
      fetchData(selectedTab);
    }
  }, [selectedTab]);

  const fetchData = async (dataType) => {
    setLoading(true);
    setError("");
    setData([]);

    try {
      const response = await fetch(`/admin/${dataType}`);
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to fetch data.");
      }

      setData(result.length ? result : []);
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Error fetching data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col">
      {/* Header */}
      <header className="w-full bg-white dark:bg-gray-800 shadow-md p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
          Admin Dashboard
        </h1>
        <a href="/">
          <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700 transition">
            Log Out
          </button>
        </a>
      </header>

      {/* Tabs */}
      <div className="my-6 flex flex-wrap justify-center gap-4">
        {[
          "eventRegistrations",
          "complaints",
          "applications",
          "contactMessages",
        ].map((tab) => (
          <button
            key={tab}
            className={`px-4 py-2 rounded-md transition-all font-bold ${
              selectedTab === tab
                ? "bg-blue-700 text-white"
                : "bg-blue-500 text-white hover:bg-blue-700"
            }`}
            onClick={() => setSelectedTab(tab)}
          >
            {tab
              .replace(/([A-Z])/g, " $1")
              .replace(/^./, (str) => str.toUpperCase())}
          </button>
        ))}
      </div>

      {/* Data Display */}
      <div className="w-11/12 mx-auto bg-white dark:bg-gray-800 p-6 rounded-md shadow-md overflow-x-auto">
        {loading ? (
          <p className="text-gray-700 dark:text-gray-300 text-center">
            Loading...
          </p>
        ) : error ? (
          <p className="text-red-500 bg-red-100 dark:bg-red-900 p-2 text-center rounded-md">
            {error}
          </p>
        ) : selectedTab ? (
          data.length > 0 ? (
            <table className="w-full border-collapse border border-gray-300 dark:border-gray-600">
              <thead>
                <tr className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
                  {Object.keys(data[0]).map((key) => (
                    <th
                      key={key}
                      className="border border-gray-300 dark:border-gray-600 px-4 py-2"
                    >
                      {key.replace(/_/g, " ").toUpperCase()}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.map((row, index) => (
                  <tr
                    key={index}
                    className="hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    {Object.values(row).map((value, idx) => (
                      <td
                        key={idx}
                        className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-gray-700 dark:text-gray-300"
                      >
                        {value}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-gray-700 dark:text-gray-300 text-center">
              No data available.
            </p>
          )
        ) : (
          <p className="text-gray-700 dark:text-gray-300 text-center">
            Select a tab to view the content.
          </p>
        )}
      </div>

      {/* Footer */}
      <footer className="w-full text-center py-4 mt-auto bg-white dark:bg-gray-800 border-t border-gray-300 dark:border-gray-600">
        <p className="text-gray-700 dark:text-gray-300">
          &copy; 2025 Admin Dashboard
        </p>
      </footer>
    </div>
  );
};

export default AdminDashboard;
