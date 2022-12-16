import React from "react";

function TopButtons({ setQuery }) {
  const cities = [
    {
      id: 1,
      title: "Londres",
    },
    {
      id: 2,
      title: "Venezuela",
    },
    {
      id: 3,
      title: "Tokyo",
    },
    {
      id: 4,
      title: "Japon",
    },
    {
      id: 5,
      title: "Alemania",
    },
  ];

  return (
    <div className="flex items-center justify-around my-6  flex-col lg:flex-row xl:flex-row xxl:flex-row">
      {cities.map((city) => (
        <button
          key={city.id}
          className="text-white text-lg font-medium"
          onClick={() => setQuery({ q: city.title })}
        >
          {city.title}
        </button>
      ))}
    </div>
  );
}

export default TopButtons;
