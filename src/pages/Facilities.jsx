import React from "react";
import { Link } from "react-router-dom";

const Facilities = () => {
  return (
    <main className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Facilities Introduction */}
      <section className="text-center py-16 bg-white dark:bg-gray-800">
        <h1 className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-4">
          Hostel Facilities
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 px-6 md:px-24">
          We provide a wide range of facilities to ensure your comfort and
          convenience during your stay. Our hostel is equipped with all the
          essentials, as well as extra amenities to make your stay more
          enjoyable.
        </p>
      </section>

      {/* Facility Categories */}
      <section className="py-16 px-6 md:px-16 flex flex-wrap gap-6 justify-center">
        {facilitiesData.map((facility, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 w-full sm:w-1/2 lg:w-1/3 p-6 rounded-lg shadow-lg hover:shadow-xl transition-transform transform hover:-translate-y-2"
          >
            <h2 className="text-2xl font-semibold text-blue-600 dark:text-blue-400 mb-2">
              {facility.title}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              {facility.description}
            </p>
            <ul className="text-gray-700 dark:text-gray-200 list-disc list-inside">
              {facility.items.map((item, idx) => (
                <li key={idx} className="mb-1">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      {/* Call to Action */}
      <section className="text-center bg-blue-600 text-white py-16 px-6 rounded-lg mx-4 md:mx-16 shadow-lg">
        <h2 className="text-3xl font-bold mb-4">
          Explore Our Hostel Facilities Today!
        </h2>
        <p className="text-lg mb-6">
          Experience the convenience and comfort of living in our hostel.
          Contact us to learn more or apply for a room today.
        </p>
        <Link
          to="/apply"
          className="bg-white text-blue-600 px-6 py-3 rounded-md text-lg font-semibold transition hover:bg-gray-200 shadow-md"
        >
          Apply Now
        </Link>
      </section>
    </main>
  );
};

// Facilities Data
const facilitiesData = [
  {
    title: "Living Facilities",
    description:
      "Our rooms and common areas are designed with comfort in mind. We have multiple living options, each offering the necessary amenities to ensure a comfortable stay.",
    items: [
      "Comfortable Rooms (Single, Double, Premium)",
      "Air Conditioning",
      "24/7 Wi-Fi",
      "24/7 Hot Water",
      "Personalized Room Heating",
    ],
  },
  {
    title: "Food & Dining",
    description:
      "Our mess offers a variety of healthy, home-cooked meals that cater to the needs of our students.",
    items: [
      "Breakfast, Lunch & Dinner",
      "Special Diets Available",
      "Vegetarian & Non-Vegetarian Options",
      "High-Quality and Fresh Ingredients",
      "Cafeteria for Snacks and Refreshments",
    ],
  },
  {
    title: "Study Facilities",
    description:
      "We understand the importance of a conducive environment for studying. Our hostel offers various study facilities for students.",
    items: [
      "Well-lit Common Study Rooms",
      "High-Speed Internet Access",
      "Individual Desks for Quiet Study",
      "24/7 Library Access",
      "Group Study Areas",
    ],
  },
  {
    title: "Recreational Facilities",
    description:
      "Our hostel offers a wide range of recreational activities to ensure you can relax and unwind after a day of studying.",
    items: [
      "Indoor Games (Table Tennis, Carom, etc.)",
      "Outdoor Sports (Badminton, Basketball)",
      "Gym Facilities",
      "Common Room with TV",
      "Movie Nights and Events",
    ],
  },
  {
    title: "Health & Safety",
    description:
      "Our top priority is the health and safety of our students. We take all necessary precautions to ensure a safe living environment.",
    items: [
      "24/7 Security Guards",
      "Fire Extinguishers and Emergency Exits",
      "First-Aid Kits on Every Floor",
      "Regular Health Check-Ups",
      "Sanitization & Hygiene Practices",
    ],
  },
  {
    title: "Additional Services",
    description:
      "We provide several additional services to make your stay more comfortable and stress-free.",
    items: [
      "Laundry Services",
      "Room Cleaning Services",
      "Transportation Assistance",
      "Access to ATM and Banking Facilities",
      "Parcel and Courier Services",
    ],
  },
];

export default Facilities;
