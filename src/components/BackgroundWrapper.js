import React, { useEffect, useState } from "react";
import morning from "../assets/morning.jpg";
import noon from "../assets/noon.jpg";
import evening from "../assets/evening.jpg";
import night from "../assets/night.jpg";

const getTimeOfDay = () => {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 11) return "morning";
  if (hour >= 11 && hour < 16) return "noon";
  if (hour >= 16 && hour < 20) return "evening";
  return "night";
};

const bgImages = {
  morning,
  noon,
  evening,
  night,
};

const BackgroundWrapper = ({ children }) => {
  const [timeOfDay, setTimeOfDay] = useState(getTimeOfDay());

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeOfDay(getTimeOfDay());
    }, 60 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="min-h-screen w-full bg-cover bg-center transition-all duration-1000"
      style={{ backgroundImage: `url(${bgImages[timeOfDay]})` }}
    >
      {/* Content area including TopBar */}
      <div className="min-h-screen w-full">{children}</div>
    </div>
  );
};

export default BackgroundWrapper;
