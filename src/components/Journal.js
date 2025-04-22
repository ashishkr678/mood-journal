import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import MoodSelector from "./MoodSelector";
import Calendar from "./Calendar";
import { motion } from "framer-motion";

const Journal = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedMood, setSelectedMood] = useState(null);
  const [note, setNote] = useState("");

  const formatDateKey = (date) => date.toISOString().split("T")[0];

  useEffect(() => {
    setSelectedMood(null);
    setNote("");
  }, [selectedDate]);

  const handleSave = () => {
    if (!note.trim() || !selectedMood) {
      toast.error("Please add a note and select your mood.");
      return;
    }

    const key = formatDateKey(selectedDate);
    let stored = [];

    try {
      const parsed = JSON.parse(localStorage.getItem(key));
      stored = Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      stored = [];
    }

    const newEntry = {
      mood: selectedMood,
      note,
      timestamp: new Date().toISOString(),
    };

    stored.push(newEntry);
    localStorage.setItem(key, JSON.stringify(stored));

    setNote("");
    toast.success("Journal entry saved!");
  };

  const getFormattedDate = (date) =>
    date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  return (
    <motion.div
      className="max-w-5xl mx-auto px-4 py-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex flex-col md:flex-row gap-6 bg-white/20 dark:bg-slate-800 p-6 rounded-2xl shadow-md">
        <div className="flex-1 space-y-4">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
            {getFormattedDate(selectedDate)}
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-200">How are you feeling today?</p>
          <MoodSelector onMoodSelect={setSelectedMood} initialMood={selectedMood} />
          <textarea
            className="w-full mt-4 p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 shadow-sm resize-none"
            rows="4"
            placeholder="Add a note..."
            value={note}
            onChange={(e) => setNote(e.target.value)}
          ></textarea>
          <motion.button
            onClick={handleSave}
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-6 rounded-lg transition-all shadow-md"
            whileTap={{ scale: 0.95 }}
          >
            Save
          </motion.button>
        </div>

        <div className="w-full md:w-1/2">
          <Calendar selectedDate={selectedDate} onDateSelect={setSelectedDate} />
        </div>
      </div>
    </motion.div>
  );
};

export default Journal;
