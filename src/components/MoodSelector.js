import React, { useState } from "react";
import { motion } from "framer-motion";

const moods = [
  { id: 1, label: "Happy", icon: "🙂" },
  { id: 2, label: "Sad", icon: "😔" },
  { id: 3, label: "Angry", icon: "😡" },
  { id: 4, label: "Relaxed", icon: "😌" },
  { id: 5, label: "Neutral", icon: "😐" },
];

const MoodSelector = ({ onMoodSelect, initialMood }) => {
  const [selectedMood, setSelectedMood] = useState(initialMood);

  const handleMoodSelect = (mood) => {
    setSelectedMood(mood);
    onMoodSelect?.(mood);
  };

  return (
    <div className="flex justify-center gap-6 flex-wrap">
      {moods.map((mood) => (
        <motion.button
          key={mood.id}
          className={`w-16 h-16 text-4xl rounded-full flex items-center justify-center transition-all
            ${
              selectedMood?.id === mood.id
                ? "bg-blue-600 text-white shadow-xl"
                : "bg-transparent text-black dark:text-white"
            }`}
          onClick={() => handleMoodSelect(mood)}
          whileHover={{
            scale: 1.2,
            rotate: [0, 5, -5, 0],
            boxShadow: "0px 0px 10px rgba(0, 123, 255, 0.6)",
          }}
          whileTap={{ scale: 0.9 }}
        >
          <span title={mood.label}>{mood.icon}</span>
        </motion.button>
      ))}
    </div>
  );
};

export default MoodSelector;
