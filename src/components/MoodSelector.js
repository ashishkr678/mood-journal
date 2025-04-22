import React, { useState } from 'react';

const moods = [
  { id: 1, label: 'Happy', icon: '🙂' },
  { id: 2, label: 'Sad', icon: '😔' },
  { id: 3, label: 'Angry', icon: '😡' },
  { id: 4, label: 'Relaxed', icon: '😌' },
  { id: 5, label: 'Neutral', icon: '😐' }
];

const MoodSelector = ({ onMoodSelect }) => {
  const [selectedMood, setSelectedMood] = useState(null);

  const handleMoodSelect = (mood) => {
    setSelectedMood(mood);
    if (onMoodSelect) {
      onMoodSelect(mood);
    }
  };

  return (
    <div className="flex flex-wrap justify-center gap-4">
      {moods.map((mood) => (
        <button
          key={mood.id}
          className={`p-4 rounded-lg border-2 flex items-center gap-2 transition-all ${
            selectedMood?.id === mood.id
              ? 'bg-blue-500 text-white border-blue-600'
              : 'bg-white text-black border-gray-300'
          } hover:bg-blue-200`}
          onClick={() => handleMoodSelect(mood)}
        >
          <span className="text-2xl">{mood.icon}</span>
          <span className="font-semibold">{mood.label}</span>
        </button>
      ))}
    </div>
  );
};

export default MoodSelector;
