import React, { useState } from "react";
import Journal from "../components/Journal";
import NotesCards from "../components/NotesCards";
import { motion } from 'framer-motion';

const Home = () => {
  const [view, setView] = useState("journal");
  return (
    <motion.div
      className="home-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2">
        <button onClick={() => setView(view === 'journal' ? 'notes' : 'journal')}>
          {view === 'journal' ? 'My Notes' : 'Journal'}
        </button>
      </div>

      {view === 'journal' ? (
        <Journal />
      ) : (
        <NotesCards />
      )}
    </motion.div>
  );
};

export default Home;
