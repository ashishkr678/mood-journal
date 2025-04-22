import { useEffect, useState } from "react";
import TopBar from "./components/TopBar";
import { getUserCoordinates } from "./services/GeolocationService";
import { getWeather } from "./services/WeatherService";

function App() {
  const [currentView, setCurrentView] = useState("journal");
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const coords = await getUserCoordinates();
        //const weatherData = await getWeather(coords);
        //setWeather(weatherData);
      } catch (error) {
        console.error("Location or weather error:", error.message);
      }
    };

    fetchWeatherData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <TopBar
        currentView={currentView}
        setCurrentView={setCurrentView}
        weather={weather}
      />

      <div className="p-4">
        {currentView === "journal" ? (
          <p>Your Journal Entry UI here</p>
        ) : (
          <p>Your All Notes UI here</p>
        )}
      </div>
    </div>
  );
}

export default App;
