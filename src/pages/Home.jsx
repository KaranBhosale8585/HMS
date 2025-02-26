import { Link } from "react-router-dom";

const Home = () => {
  const aboutItems = [
    {
      title: "Comfortable Rooms",
      desc: "Spacious rooms equipped with all necessary facilities.",
    },
    {
      title: "24/7 Security",
      desc: "Ensuring safety with round-the-clock security.",
    },
    {
      title: "Well-Equipped Mess",
      desc: "Nutritious meals catering to all needs.",
    },
  ];

  const roomData = [
    {
      title: "Single Room",
      img: "/imgs/single.png",
      desc: "A cozy single room with all the essentials.",
    },
    {
      title: "Double Room",
      img: "/imgs/double.png",
      desc: "Perfect for sharing, offering a spacious environment.",
    },
    {
      title: "Premium Room",
      img: "/imgs/premium.png",
      desc: "Luxurious and spacious, offering premium amenities.",
    },
  ];

  return (
    <main className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Hero Section */}
      <section
        className="relative h-screen bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: "url('/path-to-hero-bg.jpg')" }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center text-center text-white px-6">
          <h2 className="text-4xl md:text-5xl font-bold">
            Welcome to the College Hostel
          </h2>
          <p className="mt-4 text-lg max-w-2xl">
            Your home away from home. Comfortable and safe accommodation for all
            students.
          </p>
          <Link
            to="/apply"
            className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition transform hover:scale-105"
          >
            Apply Now
          </Link>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 px-6 text-center container mx-auto">
        <h1 className="text-3xl font-bold text-blue-600 dark:text-blue-400">
          About the Hostel
        </h1>
        <p className="mt-4 text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Our college hostel offers a safe, clean, and comfortable environment
          with access to key amenities and a community-driven atmosphere.
        </p>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          {aboutItems.map((item, index) => (
            <div
              key={index}
              className="p-6 border rounded-lg shadow-lg bg-white dark:bg-gray-800 transition-transform transform hover:-translate-y-2"
            >
              <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400">
                {item.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mt-2">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Rooms Section */}
      <section className="py-16 text-center container mx-auto">
        <h1 className="text-3xl font-bold text-blue-600 dark:text-blue-400">
          Our Rooms
        </h1>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-6">
          {roomData.map((room, index) => (
            <div
              key={index}
              className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg transition-transform transform hover:scale-105"
            >
              <img
                src={room.img}
                alt={room.title}
                className="w-full h-56 object-cover rounded-md mb-4"
              />
              <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400">
                {room.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mt-2">
                {room.desc}
              </p>
              <Link
                to="/rooms"
                className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition transform hover:scale-105"
              >
                Explore More
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-blue-600 text-white text-center">
        <h2 className="text-3xl font-bold">
          Ready to Join the College Hostel?
        </h2>
        <p className="mt-4">
          Apply now to experience a home-like stay with all the amenities you
          need!
        </p>
        <Link
          to="/apply"
          className="mt-6 inline-block bg-white text-blue-600 px-6 py-3 rounded-md hover:bg-gray-200 transition transform hover:scale-105 shadow-md"
        >
          Apply Now
        </Link>
      </section>
    </main>
  );
};

export default Home;
