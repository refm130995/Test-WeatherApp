import React, { useState } from "react";
import { UilSearch, UilLocationPoint } from "@iconscout/react-unicons";

function Inputs({ setQuery, units, setUnits }) {
  const [city, setCity] = useState("");



  const handleUnitsChange = (e) => {
    const selectedUnit = e.currentTarget.name;
    if (units !== selectedUnit) setUnits(selectedUnit);
  };

  const handleSearchClick = () => {
    if (city !== "") setQuery({ q: city });
  };

  const handleLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;
        setQuery({
          lat,
          lon,
        });
      });
    }
  };

  return (
    <div className="grid grid-cols-3">
      <div className="flex flex-row w-full items-center justify-center col-span-3 2xl:col-span-2 xl:col-span-2">
        <input
          value={city}
          onChange={(e) => setCity(e.currentTarget.value)}
          type="text"
          placeholder="Buscar por ciudad...."
          className="text-xl font-light p-2 w-full shadow-xl focus:outline-none capitalize placeholder:capitalize"
        />
        <UilSearch
          size={30}
          className="text-white cursor-pointer transition ease-out hover:scale-125 mx-4"
          onClick={handleSearchClick}
        />
        <UilLocationPoint
          size={30}
          className="text-white cursor-pointer transition ease-out hover:scale-125 mx-4"
          onClick={handleLocationClick}
        />
      </div>

      <div className="flex flex-row w-auto items-center justify-center col-span-3 2xl:col-span-1 xl:col-span-1 pt-5 2xl:pt-0 xl:pt-0">
        <button
          name="metric"
          className="text-xl text-white font-light transition ease-out hover:scale-125"
          onClick={handleUnitsChange}
        >
          °C
        </button>
        <p className="text-xl text-white mx-1">|</p>
        <button
          name="imperial"
          className="text-xl text-white font-light transition ease-out hover:scale-125"
          onClick={handleUnitsChange}
        >
          °F
        </button>
      </div>
    </div>
  );
}

export default Inputs;
