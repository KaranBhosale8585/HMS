import React from "react";
import { Link } from "react-router-dom";

const eventsData = [
  {
    title: "Cultural Night",
    description:
      "An exciting night filled with cultural performances by students, showcasing music, dance, and drama.",
    date: "15th January 2024",
    time: "6:00 PM",
    image: "/imgs/Cultural Night.png",
  },
  {
    title: "Sports Meet",
    description:
      "Join us for an exciting day of sports, competition, and team spirit. All students are invited to participate.",
    date: "20th February 2024",
    time: "9:00 AM",
    image: "/imgs/Sports Meet.png",
  },
  {
    title: "Tech Symposium",
    description:
      "A gathering of tech enthusiasts for talks, presentations, and hands-on workshops on the latest in technology.",
    date: "5th March 2024",
    time: "10:00 AM",
    image: "/imgs/Tech Symposium.png",
  },
  {
    title: "Annual Festival",
    description:
      "A week-long celebration featuring music, art, food, and more. It's a time for everyone to come together and celebrate.",
    date: "25th April 2024",
    time: "5:00 PM",
    image: "/imgs/Annual Festival.png",
  },
];

const Events = () => {
  return (
    <main className="bg-gray-100 dark:bg-gray-900 min-h-screen py-16 px-6 flex flex-col items-center">
      {/* Section Header */}
      <section className="max-w-4xl text-center">
        <h2 className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-4">
          🎉 Upcoming Events 🎉
        </h2>
        <p className="text-lg text-gray-700 dark:text-gray-300">
          Stay updated with the latest events happening at our college hostel.
          Join us and be a part of the excitement!
        </p>
      </section>

      {/* Events Grid */}
      <section className="w-full max-w-6xl mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {eventsData.map((event, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition duration-300 transform hover:-translate-y-2"
          >
            {/* Image Section with Overlay */}
            <div className="relative">
              <img
                src={event.image}
                alt={`${event.title} event`}
                loading="lazy"
                className="w-full h-56 object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                <p className="text-white text-lg font-semibold text-center">
                  ✨ {event.title} ✨
                </p>
              </div>
            </div>

            {/* Event Details */}
            <div className="p-6 text-center">
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                {event.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mt-2">
                {event.description}
              </p>
              <div className="mt-4 text-gray-700 dark:text-gray-400 text-sm">
                <p>
                  <span className="font-semibold">📅 Date:</span> {event.date}
                </p>
                <p>
                  <span className="font-semibold">⏰ Time:</span> {event.time}
                </p>
              </div>

              {/* Register Button */}
              <div className="mt-6 flex justify-center">
                <Link
                  to="/event-registration"
                  className="bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 dark:hover:bg-blue-500 transition-all shadow-md hover:shadow-lg transform hover:scale-105"
                >
                  Register Now 🚀
                </Link>
              </div>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
};

export default Events;
