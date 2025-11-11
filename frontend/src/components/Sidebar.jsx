import React from "react";
import { NavLink } from "react-router-dom";
import {
  Package,
  DollarSign,
  Users,
  TrendingUp,
  LayoutDashboard,
} from "lucide-react";

const Sidebar = () => {
  const links = [
    { to: "/", label: "Dashboard", icon: LayoutDashboard },
    { to: "/products", label: "Products", icon: Package },
    { to: "/sales", label: "Sales", icon: DollarSign },
    { to: "/suppliers", label: "Suppliers", icon: Users },
    { to: "/transactions", label: "Transactions", icon: TrendingUp },
  ];

  return (
    <aside className="w-64 h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950 border-r border-gray-200 dark:border-gray-800 flex flex-col shadow-sm">
      {/* Header */}
      <div className="h-16 flex items-center justify-center border-b border-gray-200 dark:border-gray-800">
        <h1 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-gray-100">
          Inventory<span className="text-blue-600 dark:text-blue-500">Pro</span>
        </h1>
      </div>

      {/* Nav Links */}
      <nav className="flex-1 px-4 py-6 overflow-y-auto">
        <ul className="space-y-1">
          {links.map(({ to, label, icon: Icon }) => (
            <li key={to}>
              <NavLink
                to={to}
                end
                className={({ isActive }) =>
                  `group flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400"
                      : "text-gray-600 dark:text-gray-400 hover:text-blue-600 hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <Icon
                      className={`w-5 h-5 transition-transform ${
                        isActive ? "scale-110" : "group-hover:scale-110"
                      }`}
                    />
                    <span>{label}</span>
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer */}
      <div className="border-t border-gray-200 dark:border-gray-800 p-4 text-xs text-gray-500 dark:text-gray-500">
        v1.0.0
      </div>
    </aside>
  );
};

export default Sidebar;