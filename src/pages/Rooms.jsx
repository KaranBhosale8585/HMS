import React from "react";
import { Link } from "react-router-dom";

const roomsData = [
  {
    id: 1,
    name: "Single Room",
    image: "./imgs/single.png",
    description:
      "Perfect for students who prefer privacy, this room comes with a single bed, study table, and all essential amenities.",
    features: [
      "Single Bed",
      "Study Table",
      "Attached Bathroom",
      "24/7 Wi-Fi",
      "Storage Space",
    ],
    price: "₹3000/month",
  },
  {
    id: 2,
    name: "Double Room",
    image: "./imgs/double.png",
    description:
      "Our double rooms are perfect for sharing. With two beds and a spacious layout, these rooms are ideal for roommates.",
    features: [
      "Two Single Beds",
      "Shared Study Table",
      "Attached Bathroom",
      "24/7 Wi-Fi",
      "Storage Space",
    ],
    price: "₹2000/month",
  },
  {
    id: 3,
    name: "Premium Room",
    image: "./imgs/premium.png",
    description:
      "For those who desire more luxury, our premium rooms offer upgraded amenities and a more spacious environment.",
    features: [
      "Queen-Sized Bed",
      "Private Study Area",
      "Attached Bathroom with Hot Water",
      "24/7 Wi-Fi",
      "Mini Fridge",
      "Air Conditioning",
    ],
    price: "₹4000/month",
  },
];

const RoomCard = ({ room }) => {
  return (
    <div className="bg-white dark:bg-gray-800 shadow-md dark:shadow-lg rounded-lg p-6 text-center hover:shadow-xl dark:hover:shadow-gray-700 transition-all">
      <img
        src={room.image}
        alt={room.name}
        className="w-full rounded-lg mb-4"
        loading="lazy"
      />
      <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400">
        {room.name}
      </h2>
      <p className="text-gray-600 dark:text-gray-300 mb-4">
        {room.description}
      </p>
      <ul className="text-left mb-4">
        {room.features.map((feature, index) => (
          <li key={index} className="text-gray-700 dark:text-gray-300">
            ✅ {feature}
          </li>
        ))}
      </ul>
      <p className="text-lg font-semibold text-blue-500">{room.price}</p>
      <Link
            to="/apply"
        className="mt-4 inline-block bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 dark:hover:bg-blue-500 transition"
      >
        Apply Now
      </Link>
    </div>
  );
};

const Rooms = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 w-full max-w-5xl">
        {/* Room Intro */}
        <h1 className="text-3xl font-bold text-blue-600 dark:text-blue-400 text-center">
          Our Comfortable Rooms
        </h1>
        <p className="text-gray-600 dark:text-gray-300 text-center mt-2 mb-6">
          Explore the different room options available at our hostel.
        </p>

        {/* Room Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {roomsData.map((room) => (
            <RoomCard key={room.id} room={room} />
          ))}
        </div>

        {/* Facilities Section */}
        <div className="bg-gray-100 dark:bg-gray-900 shadow-lg rounded-lg p-6 mt-12">
          <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400 text-center">
            Room Facilities
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-center mt-2">
            All our rooms come with the following facilities:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-6">
            {[
              { title: "24/7 Wi-Fi", desc: "High-speed internet everywhere." },
              { title: "Clean & Safe", desc: "Daily cleaning, 24/7 security." },
              { title: "Power Backup", desc: "Uninterrupted power supply." },
              { title: "Housekeeping", desc: "Regular housekeeping services." },
            ].map((facility, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 shadow-md dark:shadow-lg rounded-lg p-6 hover:shadow-xl transition-all"
              >
                <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-400">
                  {facility.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mt-2">
                  {facility.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400 text-center">
            Room Pricing
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-center mt-2">
            Affordable and flexible pricing for every student.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
            {roomsData.map((room) => (
              <div
                key={room.id}
                className="bg-gray-100 dark:bg-gray-800 shadow-md dark:shadow-lg rounded-lg p-6 hover:shadow-xl transition-all"
              >
                <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400">
                  {room.name}
                </h3>
                <p className="text-lg font-bold text-blue-500">{room.price}</p>
                <p className="text-gray-600 dark:text-gray-300 mt-2">
                  {room.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center bg-blue-600 text-white rounded-lg p-6 mt-12">
          <h2 className="text-2xl font-bold">Ready to Book Your Room?</h2>
          <p className="text-lg mt-2">
            Secure your stay by filling out the application form today!
          </p>
          <a
            href="/apply"
            className="mt-4 inline-block bg-white text-blue-600 py-2 px-6 rounded-md text-lg font-semibold hover:bg-gray-200 dark:hover:bg-gray-700 transition"
          >
            Apply Now
          </a>
        </div>
      </div>
    </div>
  );
};

export default Rooms;
