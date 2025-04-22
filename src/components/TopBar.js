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

const TopBar = ({ weather }) => {
  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 80 }}
      className="w-full px-4 py-3 flex justify-between items-center
                 bg-white/10 backdrop-blur-sm text-white sticky top-0 z-50"
    >
      <h1 className="text-2xl font-bold drop-shadow-md">MoodMate</h1>

      <div className="flex items-center gap-4">
        {weather ? (
          <div className="flex items-center gap-2 text-sm font-medium">
            {weatherIcons[weather.condition] || <FaCloud className="text-white text-xl" />}
            <span>{weather.temp}°C</span>
            <span className="capitalize">({weather.condition})</span>
            <span className="truncate max-w-[150px]">{weather.location}</span>
          </div>
        ) : (
          <span className="text-white/70 text-sm">Fetching weather wait for some time...</span>
        )}
      </div>
    </motion.div>
  );
};

export default TopBar;
