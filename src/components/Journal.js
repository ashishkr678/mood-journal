import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { FaCalendarAlt } from "react-icons/fa";
import MoodSelector from "./MoodSelector";
import Calendar from "./Calendar";
import { motion } from "framer-motion";

const Journal = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedMood, setSelectedMood] = useState(null);
  const [note, setNote] = useState("");
  const [showCalendarMobile, setShowCalendarMobile] = useState(false);

  const formatDateKey = (date) => date.toISOString().split("T")[0];

  useEffect(() => {
    setSelectedMood(null);
    setNote("");
    setShowCalendarMobile(false);
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
    } catch {
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
      className="max-w-5xl mx-auto px-4 py-6 md:px-8 md:py-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex flex-col md:flex-row gap-6 bg-white/30 dark:bg-white/10 backdrop-blur-md p-6 md:p-8 rounded-2xl shadow-xl border border-white/20 relative">
        <div className="w-full md:w-[60%] flex flex-col space-y-6 text-center relative">
          <button
            onClick={() => setShowCalendarMobile((v) => !v)}
            className="absolute top-3 right-3 md:hidden text-gray-700 dark:text-gray-300"
            aria-label="Toggle calendar"
          >
            <FaCalendarAlt className="text-2xl" />
          </button>

          <h2 className="text-xl font-bold text-gray-800 dark:text-white text-left">
            {getFormattedDate(selectedDate)}
          </h2>

          <p className="text-lg text-gray-200 dark:text-gray-100 font-medium">
            How are you feeling today?
          </p>

          <MoodSelector
            onMoodSelect={setSelectedMood}
            initialMood={selectedMood}
          />

          <textarea
            className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-500 bg-white/60 dark:bg-gray-800/40 text-gray-600 dark:text-gray-100 shadow-sm resize-none"
            rows="4"
            placeholder="Add a note..."
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />

          <motion.div className="flex justify-center w-full">
            <motion.button
              onClick={handleSave}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-blue-300 to-cyan-500 text-white px-6 py-2 rounded-full shadow-lg font-semibold transition-all duration-300 hover:shadow-xl focus:outline-none"
            >
              Save
            </motion.button>
          </motion.div>
        </div>

        <div className="hidden md:block w-full md:w-[40%]">
          <Calendar
            selectedDate={selectedDate}
            onDateSelect={setSelectedDate}
          />
        </div>
      </div>

      {showCalendarMobile && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="md:hidden mt-4 bg-white/30 dark:bg-white/10 backdrop-blur-md p-4 rounded-2xl shadow-lg border border-white/20"
        >
          <Calendar
            selectedDate={selectedDate}
            onDateSelect={setSelectedDate}
          />
        </motion.div>
      )}
    </motion.div>
  );
};

export default Journal;
