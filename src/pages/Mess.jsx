import React from "react";

const menuData = {
  Breakfast: [
    {
      name: "Aloo Paratha",
      description:
        "Delicious stuffed flatbread with spiced potato filling served with yogurt and pickle.",
      image: "/imgs/Aloo Paratha.png",
    },
    {
      name: "Poha",
      description:
        "A light and flavorful dish made with flattened rice, mustard seeds, peanuts, and curry leaves.",
      image: "/imgs/Poha.png",
    },
    {
      name: "Chole Bhature",
      description: "Deep-fried fluffy bread served with spicy chickpea curry.",
      image: "/imgs/Chole Bhature.png",
    },
  ],
  Lunch: [
    {
      name: "Rajma Chawal",
      description:
        "Red kidney beans cooked in a flavorful gravy, served with steamed rice.",
      image: "/imgs/Rajma Chawal.png",
    },
    {
      name: "Paneer Butter Masala",
      description:
        "Soft paneer cubes cooked in a rich and creamy tomato-based gravy.",
      image: "/imgs/Paneer Butter Masala.png",
    },
    {
      name: "Vegetable Biryani",
      description:
        "Fragrant basmati rice cooked with mixed vegetables and aromatic spices.",
      image: "/imgs/Vegetable Biryani.png",
    },
  ],
  Dinner: [
    {
      name: "Dal Tadka",
      description:
        "Lentils cooked with garlic, cumin, and tomatoes, served with steamed rice or roti.",
      image: "/imgs/Dal Tadka.png",
    },
    {
      name: "Gobi Masala",
      description:
        "Cauliflower florets cooked in a spicy tomato and onion gravy.",
      image: "/imgs/Gobi Masala.png",
    },
    {
      name: "Roti & Sabzi",
      description:
        "Soft Indian flatbreads served with a seasonal vegetable curry.",
      image: "/imgs/Roti & Sabzi.png",
    },
  ],
  "Special Dishes": [
    {
      name: "Dosa",
      description:
        "Crispy thin rice crepes filled with spiced potato filling, served with chutneys and sambar.",
      image: "/imgs/Dosa.png",
    },
    {
      name: "Pav Bhaji",
      description:
        "A spiced vegetable mash served with buttered pav (bread rolls).",
      image: "/imgs/Pav Bhaji.png",
    },
  ],
};

const todaysMeal = {
  Breakfast: "Aloo Paratha with yogurt and pickle.",
  Lunch: "Rajma Chawal with raita.",
  Dinner: "Dal Tadka with roti and sabzi.",
};

const Mess = () => {
  return (
    <main className="bg-gray-100 dark:bg-gray-900 min-h-screen py-10 px-6">
      <section className="max-w-6xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-6">
          🍽️ Our Mess Menu
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
          Enjoy a variety of delicious and freshly cooked Indian meals at our
          hostel mess!
        </p>

        {/* Menu Sections */}
        {Object.entries(menuData).map(([category, items], index) => (
          <section key={index} className="mb-12">
            <h2 className="text-3xl font-semibold text-blue-500 dark:text-blue-300 mb-6 text-center">
              {category}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-center">
              {items.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden transform hover:shadow-xl transition duration-300"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-48 object-cover"
                    loading="lazy"
                  />
                  <div className="p-5 flex flex-col h-40">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                      {item.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mt-2 flex-grow">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}

        {/* Today's Meal Plan */}
        <section className="bg-gradient-to-r from-blue-100 to-blue-50 dark:from-gray-800 dark:to-gray-700 shadow-lg rounded-lg p-8 max-w-3xl mx-auto mt-12">
          <h2 className="text-3xl font-semibold text-blue-600 dark:text-blue-400 mb-4 text-center">
            🍛 Today's Meal Plan
          </h2>
          <div className="text-gray-800 dark:text-gray-300 text-lg space-y-2 text-center">
            {Object.entries(todaysMeal).map(([meal, description], index) => (
              <p
                key={index}
                className="bg-white dark:bg-gray-800 p-4 rounded-md shadow-md"
              >
                <strong className="text-blue-600 dark:text-blue-400">
                  {meal}:
                </strong>{" "}
                {description}
              </p>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
};

export default Mess;
