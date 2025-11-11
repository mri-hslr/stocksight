import React from "react";
import { motion } from "framer-motion";
import { Package, DollarSign, Users, TrendingUp } from "lucide-react";

const Dashboard = () => {
  const stats = [
    {
      label: "Products",
      value: "1,245",
      icon: Package,
      color: "from-blue-500/10 to-blue-500/5 text-blue-600 dark:text-blue-400",
    },
    {
      label: "Sales",
      value: "$89.2K",
      icon: DollarSign,
      color: "from-green-500/10 to-green-500/5 text-green-600 dark:text-green-400",
    },
    {
      label: "Suppliers",
      value: "312",
      icon: Users,
      color: "from-purple-500/10 to-purple-500/5 text-purple-600 dark:text-purple-400",
    },
    {
      label: "Transactions",
      value: "7,458",
      icon: TrendingUp,
      color: "from-amber-500/10 to-amber-500/5 text-amber-600 dark:text-amber-400",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="p-6 bg-gray-50 dark:bg-gray-950 min-h-screen rounded-2xl"
    >
      {/* ===== Header Section ===== */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
          Dashboard
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
          Overview of your inventory system’s key metrics
        </p>
      </div>

      {/* ===== Stats Grid ===== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map(({ label, value, icon: Icon, color }, index) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-sm p-5 flex items-center justify-between hover:shadow-md transition-all"
          >
            <div>
              <h3 className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                {label}
              </h3>
              <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mt-1">
                {value}
              </p>
            </div>
            <div
              className={`w-12 h-12 bg-gradient-to-br ${color} rounded-xl flex items-center justify-center`}
            >
              <Icon className="w-6 h-6" />
            </div>
          </motion.div>
        ))}
      </div>

      {/* ===== Optional Placeholder for Charts / Insights ===== */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-sm p-6 min-h-[250px]">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
            Sales Overview
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Add a chart or trend visualization here.
          </p>
        </div>
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-sm p-6 min-h-[250px]">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
            Top Performing Products
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Display key product stats or leaderboards here.
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Dashboard;
