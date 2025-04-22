import React from "react";
import { FaTrash } from "react-icons/fa";

const moodIcons = {
  Happy: "🙂",
  Sad: "😔",
  Angry: "😡",
  Relaxed: "😌",
  Neutral: "😐",
};

const NoteCard = ({ entry, onDelete }) => {
  const formatDate = (iso) =>
    new Date(iso).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  return (
    <div className="relative p-4 rounded-xl shadow-md bg-white/90 dark:bg-gray-800 backdrop-blur-md border border-gray-200 dark:border-gray-600">
      <button
        className="absolute top-2 right-2 text-gray-400 hover:text-red-500"
        onClick={onDelete}
        title="Delete note"
      >
        <FaTrash />
      </button>
      <div className="text-2xl mb-2">{entry.mood ? moodIcons[entry.mood.label] : "📝"}</div>
      <p className="text-gray-800 dark:text-gray-100 font-medium mb-2">{entry.note}</p>
      <div className="text-sm text-gray-500 dark:text-gray-400">{formatDate(entry.timestamp)}</div>
    </div>
  );
};

export default NoteCard;
