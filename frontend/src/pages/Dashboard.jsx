import React from "react";
import { motion } from "framer-motion";
import { Package, DollarSign, Users, TrendingUp } from "lucide-react";

const Dashboard = () => {
  const stats = [
    { label: "Products", value: "—", icon: Package },
    { label: "Sales", value: "—", icon: DollarSign },
    { label: "Suppliers", value: "—", icon: Users },
    { label: "Transactions", value: "—", icon: TrendingUp },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
    >
      {stats.map(({ label, value, icon: Icon }) => (
        <div
          key={label}
          className="bg-white rounded-xl p-5 border shadow-sm flex items-center gap-4"
        >
          <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
            <Icon className="w-5 h-5 text-gray-700" />
          </div>
          <div>
            <h3 className="text-sm text-gray-500">{label}</h3>
            <p className="text-lg font-semibold text-gray-800">{value}</p>
          </div>
        </div>
      ))}
    </motion.div>
  );
};

export default Dashboard;
