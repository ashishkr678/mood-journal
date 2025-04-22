import { useEffect, useState } from "react";
import TopBar from "./components/TopBar";
import BackgroundWrapper from "./components/BackgroundWrapper";
import { getUserCoordinates } from "./services/GeolocationService";
import { getWeather } from "./services/WeatherService";

function App() {
  const [currentView, setCurrentView] = useState("journal");
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const coords = await getUserCoordinates();
        // const weatherData = await getWeather(coords);
        // setWeather(weatherData);
      } catch (error) {
        console.error("Location or weather error:", error.message);
      }
    };

    fetchWeatherData();
  }, []);

  return (
    <BackgroundWrapper>
      {/* TopBar should be inside the background for layering */}
      <TopBar currentView={currentView} setCurrentView={setCurrentView} weather={weather} />

      <div className="p-6 z-10 relative text-white">
        {currentView === "journal" ? (
          <p>Your Journal Entry UI here</p>
        ) : (
          <p>Your All Notes UI here</p>
        )}
      </div>
    </BackgroundWrapper>
  );
}

export default App;
