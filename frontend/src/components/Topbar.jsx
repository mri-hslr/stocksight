import React from "react";
import { motion } from "framer-motion";

const Topbar = () => {
  return (
    <motion.header
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="h-16 bg-white shadow-sm flex items-center justify-between px-6 border-b border-gray-200"
    >
      <h2 className="text-lg font-semibold text-gray-800">Inventory Dashboard</h2>
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center text-sm font-semibold text-gray-600">
          A
        </div>
      </div>
    </motion.header>
  );
};

export default Topbar;