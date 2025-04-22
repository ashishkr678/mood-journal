import { FaSun, FaCloudRain, FaSnowflake, FaCloud, FaSmog } from "react-icons/fa";
import { motion } from "framer-motion";

const weatherIcons = {
  Sunny: <FaSun className="text-yellow-400 text-xl" />,
  Clear: <FaSun className="text-yellow-400 text-xl" />,
  Rain: <FaCloudRain className="text-blue-400 text-xl" />,
  Snow: <FaSnowflake className="text-cyan-200 text-xl" />,
  Cloudy: <FaCloud className="text-gray-300 text-xl" />,
  Overcast: <FaCloud className="text-gray-400 text-xl" />,
  Haze: <FaSmog className="text-gray-400 text-xl" />,
};

const TopBar = ({ currentView, setCurrentView, weather }) => {
  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 80 }}
      className="w-full px-4 py-3 flex justify-between items-center bg-gradient-to-r from-blue-100 to-blue-50 shadow-sm sticky top-0 z-50"
    >
      <h1 className="text-2xl font-bold text-blue-600">MoodMate</h1>

      <div className="flex items-center gap-4">
        {weather ? (
          <div className="flex items-center gap-2 text-sm text-gray-700 font-medium">
            {weatherIcons[weather.condition] || <FaCloud className="text-gray-400 text-xl" />}
            <span>{weather.temp}°C</span>
            <span className="capitalize text-gray-500">({weather.condition})</span>
            <span className="truncate max-w-[150px]">{weather.location}</span>
          </div>
        ) : (
          <span className="text-gray-400 text-sm">Fetching weather...</span>
        )}

        <button
          onClick={() => setCurrentView("journal")}
          className={`px-4 py-1 rounded-full text-sm font-medium transition ${
            currentView === "journal"
              ? "bg-blue-500 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          Journal
        </button>
        <button
          onClick={() => setCurrentView("all-notes")}
          className={`px-4 py-1 rounded-full text-sm font-medium transition ${
            currentView === "all-notes"
              ? "bg-blue-500 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          All Notes
        </button>
      </div>
    </motion.div>
  );
};

export default TopBar;
