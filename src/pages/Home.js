import React, { useState } from "react";
import Journal from "../components/Journal";
import NotesList from "../components/NotesList";

const Home = () => {
  const [view, setView] = useState("journal");

  return (
    <div className="relative min-h-screen pb-24">
      {view === "journal" ? <Journal /> : <NotesList />}

      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2">
        <button
          onClick={() => setView(view === "journal" ? "notes" : "journal")}
          className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-full shadow-lg transition-all"
        >
          {view === "journal" ? "My Notes" : "Journal"}
        </button>
      </div>
    </div>
  );
};

export default Home;
