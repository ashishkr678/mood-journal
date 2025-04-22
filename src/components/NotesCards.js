import React, { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";

const moodIcons = {
  Happy: "🙂",
  Sad: "😔",
  Angry: "😡",
  Relaxed: "😌",
  Neutral: "😐",
};

const NotesCards = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const allEntries = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (/^\d{4}-\d{2}-\d{2}$/.test(key)) {
        try {
          const data = JSON.parse(localStorage.getItem(key));
          const entries = Array.isArray(data) ? data : [data];
          entries.forEach((entry) => {
            allEntries.push({ ...entry, dateKey: key });
          });
        } catch (e) {
          console.error("Invalid JSON in localStorage for key:", key);
        }
      }
    }

    allEntries.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    setNotes(allEntries);
  }, []);

  const handleDelete = (entryToDelete) => {
    let stored = [];

    try {
      const data = JSON.parse(localStorage.getItem(entryToDelete.dateKey));
      stored = Array.isArray(data) ? data : [data];
    } catch (e) {
      stored = [];
    }

    const updated = stored.filter(
      (e) => e.timestamp !== entryToDelete.timestamp
    );

    if (updated.length === 0) {
      localStorage.removeItem(entryToDelete.dateKey);
    } else {
      localStorage.setItem(entryToDelete.dateKey, JSON.stringify(updated));
    }

    setNotes((prev) =>
      prev.filter((n) => n.timestamp !== entryToDelete.timestamp)
    );
    toast.success("Note deleted!");
  };

  const formatDate = (iso) =>
    new Date(iso).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  return (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-5xl mx-auto p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      {notes.length === 0 ? (
        <p className="text-center col-span-2 text-gray-200 text-xl">No notes yet...</p>
      ) : (
        notes.map((entry, idx) => (
          <motion.div
            key={idx}
            className="relative p-4 rounded-xl shadow-md bg-white/20 dark:bg-gray-800/30 backdrop-blur-md border border-white/30 dark:border-gray-700"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
          >
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-red-500"
              onClick={() => handleDelete(entry)}
              title="Delete note"
            >
              <FaTrash />
            </button>

            <div className="flex items-center gap-2 text-2xl mb-2">
              <span>{entry.mood ? moodIcons[entry.mood.label] : "📝"}</span>
              <span className="text-base font-medium text-gray-700 dark:text-gray-300">
                {entry.mood?.label}
              </span>
            </div>

            <p className="text-gray-800 dark:text-gray-100 font-medium mb-2">
              {entry.note}
            </p>

            <div className="text-sm text-gray-500 dark:text-gray-400">
              {formatDate(entry.timestamp)}
            </div>
          </motion.div>
        ))
      )}
    </motion.div>
  );
};

export default NotesCards;
