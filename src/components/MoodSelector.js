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
    if (onMoodSelect) {
      onMoodSelect(mood);
    }
  };

  return (
    <div className="flex flex-wrap justify-center gap-4">
      {moods.map((mood) => (
        <motion.button
          key={mood.id}
          className={`p-4 rounded-lg border-2 flex items-center gap-2 transition-all relative ${
            selectedMood?.id === mood.id
              ? "bg-blue-500 text-white border-blue-600"
              : "bg-white text-black border-gray-300"
          } hover:bg-blue-200`}
          onClick={() => handleMoodSelect(mood)}
          whileHover={{ scale: 1.05 }}
        >
          <span className="text-2xl" title={mood.label}>
            {mood.icon}
          </span>
          <span className="font-semibold">{mood.label}</span>
        </motion.button>
      ))}
    </div>
  );
};

export default MoodSelector;
