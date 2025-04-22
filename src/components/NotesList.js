import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import NoteCard from "./NoteCard";

const NotesList = () => {
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
      // Ensure stored is always an array
      stored = Array.isArray(data) ? data : [data];
    } catch (e) {
      console.error("Failed to parse stored data:", e);
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
  

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-5xl mx-auto p-4">
      {notes.length === 0 ? (
        <p className="text-center col-span-2 text-gray-500">No notes yet.</p>
      ) : (
        notes.map((entry, idx) => (
          <NoteCard key={idx} entry={entry} onDelete={() => handleDelete(entry)} />
        ))
      )}
    </div>
  );
};

export default NotesList;
