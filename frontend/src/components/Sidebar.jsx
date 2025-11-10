import React from "react";
import { NavLink } from "react-router-dom";
import { Package, DollarSign, Users, TrendingUp, LayoutDashboard } from "lucide-react";

const Sidebar = () => {
  const links = [
    { to: "/", label: "Dashboard", icon: LayoutDashboard },
    { to: "/products", label: "Products", icon: Package },
    { to: "/sales", label: "Sales", icon: DollarSign },
    { to: "/suppliers", label: "Suppliers", icon: Users },
    { to: "/transactions", label: "Transactions", icon: TrendingUp },
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
      <div className="h-16 flex items-center justify-center border-b">
        <h1 className="text-xl font-semibold text-gray-800">Inventory</h1>
      </div>
      <nav className="flex-1 px-3 py-4">
        {links.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg mb-2 transition-all ${
                isActive
                  ? "bg-gray-100 text-gray-900 font-medium"
                  : "text-gray-500 hover:bg-gray-50 hover:text-gray-800"
              }`
            }
          >
            <Icon className="w-5 h-5" />
            {label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
