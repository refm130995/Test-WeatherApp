import React from "react";
import { formatToLocalTime } from "../services/weatherService";

function TimeAndLocation({ weather: { dt, timezone, name, country } }) {
  return (
    <div>
      <div className="flex items-center justify-center my-6">
        <p className="text-white text-xl font-extralight text-center 2xl:text-justify xl:text-justify">
          {formatToLocalTime(dt, timezone)}
        </p>
      </div>

      <div className="flex items-center justify-center my-3">
        <p className="text-white text-3xl font-medium text-center 2xl:text-justify xl:text-justify">{`${name}, ${country}`}</p>
      </div>
    </div>
  );
}

export default TimeAndLocation;