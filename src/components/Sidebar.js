import { NavLink } from "react-router-dom";
import {
  FiGrid,
  FiUsers,
  FiBox,
  FiHeart,
  FiPieChart,
  FiMapPin,
  FiAward,
} from "react-icons/fi";
import { FaLeaf } from "react-icons/fa";

const Sidebar = () => {
  const navLinks = [
    { to: "/dashboard", icon: <FiGrid />, text: "Dashboard" },
    { to: "/users", icon: <FiUsers />, text: "User Management" },
    { to: "/bottles", icon: <FiBox />, text: "Bottle & Recycling" },
    { to: "/partners", icon: <FiHeart />, text: "Partners" },
    { to: "/bins", icon: <FiMapPin />, text: "Smart Bin Location" },
    { to: "/rewards", icon: <FiAward />, text: "Reward Catalog" },
  ];

  return (
    <aside className="w-64 min-h-screen bg-white shadow-lg">
      <div className="p-6 flex items-center space-x-3">
        <FaLeaf className="text-3xl text-green-500" />
        <h1 className="text-2xl font-bold text-gray-800">EcoDZ</h1>
      </div>
      <nav className="mt-6">
        {navLinks.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `flex items-center px-6 py-3 text-gray-600 hover:bg-gray-100 hover:text-gray-800 transition-colors duration-200 ${
                isActive ? "bg-green-100 text-green-700 font-semibold" : ""
              }`
            }
          >
            <span className="mr-4 text-xl">{link.icon}</span>
            {link.text}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
