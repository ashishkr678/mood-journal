import { useEffect, useState } from "react";
import TopBar from "./components/TopBar";
import BackgroundWrapper from "./components/BackgroundWrapper";
import { getUserCoordinates } from "./services/GeolocationService";
import { getWeather } from "./services/WeatherService";
import Home from "./pages/Home";

function App() {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const coords = await getUserCoordinates();
        const weatherData = await getWeather(coords);
        setWeather(weatherData);
      } catch (error) {
        console.error("Location or weather error:", error.message);
      }
    };

    fetchWeatherData();
  }, []);

  return (
    <BackgroundWrapper>
      <TopBar weather={weather} />
      <div className="p-6 z-10 relative text-white">
        <Home weather={weather} />
      </div>
    </BackgroundWrapper>
  );
}

export default App;
