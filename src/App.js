import "./App.css";
import TopButtons from "./components/TopButtons";
import Inputs from "./components/Inputs";
import TimeAndLocation from "./components/TimeAndLocation";
import TemperatureAndDetails from "./components/TemperatureAndDetails";
import Forecast from "./components/Forecast";
import getFormattedWeatherData from "./services/weatherService";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [query, setQuery] = useState({ q: "" });
  const [units, setUnits] = useState("metric");
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      const message = query.q ? query.q : "Ubicacion Actual.";
      toast.info("Obteniendo el pronóstico para " + message);
      if (!query.q) {
        navigator.geolocation.getCurrentPosition(async (position) => {
          let lat = position.coords.latitude;
          let lon = position.coords.longitude;
          await getFormattedWeatherData({ lat: lat, lon: lon, units }).then(
            (data) => {
              toast.success(
                `Obtuvo con éxito el pronóstico para ${data.name}, ${data.country}.`
              );

              setWeather(data);
            }
          );
        });
      } else {
        await getFormattedWeatherData({ ...query, units }).then((data) => {
          toast.success(
            `Obtuvo con éxito el Pronóstico para ${data.name}, ${data.country}.`
          );

          setWeather(data);
        });
      }
    };

    fetchWeather();
  }, [query, units]);

  const formatBackground = () => {
    if (!weather) return "from-cyan-700 to-blue-700";
    const threshold = units === "metric" ? 20 : 60;
    if (weather.temp <= threshold) return "from-cyan-700 to-blue-700";

    return "from-yellow-700 to-orange-700";
  };

  return (
    <div
      className={`mx-auto max-w-screen-md py-5 px-10 2xl:px-32 xl:px-32 bg-gradient-to-br  h-fit shadow-xl shadow-gray-400 ${formatBackground()}`}
    >
      <TopButtons setQuery={setQuery} />
      <Inputs setQuery={setQuery} units={units} setUnits={setUnits} />

      {weather && (
        <div>
          <TimeAndLocation weather={weather} />
          <TemperatureAndDetails weather={weather} />

          <Forecast title="Pronóstico por hora" items={weather.hourly} />
          <Forecast title="Pronóstico diario" items={weather.daily} />
        </div>
      )}

      <ToastContainer autoClose={5000} theme="colored" newestOnTop={true} />
    </div>
  );
}

export default App;
