import React from "react";
import { iconUrlFromCode } from "../services/weatherService";

function Forecast({ title, items }) {
  return (
    <div>
      <div className="flex items-center justify-start mt-6">
        <p className="text-white font-medium uppercase">{title}</p>
      </div>
      <hr className="my-2" />

      <div className="flex 2xl:flex-row xl:flex-row lg:flex-row flex-col items-center justify-between text-white">
        {items.map((item, index) => (
          
          <div
            key={index}
            className="flex flex-col items-center justify-center"
          >
            <p className="font-light text-sm">{item.title}</p>
            <img
              src={iconUrlFromCode(item.icon)}
              className="w-12 my-1"
              alt=""
            />
            {item.minTemp && item.maxTemp ? (
              <>
                <p className="font-medium">min: {`${item.minTemp.toFixed()}°`}</p>
                <p className="font-medium">max: {`${item.maxTemp.toFixed()}°`}</p>
              </>
            ) : (
              <p className="font-medium">{`${item.temp.toFixed()}°`}</p>
            )}

            <hr className="my-4 w-full" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Forecast;
