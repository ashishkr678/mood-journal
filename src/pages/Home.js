import React, { useState } from "react";
import Journal from "../components/Journal";
import NotesCards from "../components/NotesCards";
import { motion } from "framer-motion";

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
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50">
        <motion.button
          onClick={() => setView(view === "journal" ? "notes" : "journal")}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-gradient-to-r from-blue-300 to-cyan-500 text-white px-6 py-2 rounded-full shadow-lg font-semibold transition-all duration-300 hover:shadow-xl focus:outline-none"
        >
          {view === "journal" ? "My Notes" : "Journal"}
        </motion.button>
      </div>

      {view === "journal" ? <Journal /> : <NotesCards />}
    </motion.div>
  );
};

export default Home;
