import React from "react";
import { Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

const Sidebar: React.FC = () => {
  return (
    <div className="w-64 bg-purple-100 p-4 h-screen flex flex-col justify-between">
      <div>
        <Link
          to="/"
          className="w-full bg-purple-500 text-white py-2 px-4 rounded mb-4 block hover:bg-purple-700"
        >
          Dashboard
        </Link>
        <Link
          to="/Transactions"
          className="w-full text-gray-700 py-2 px-4 rounded mb-2 flex items-center hover:bg-purple-700"
        >
          <span className="mr-2">📄</span> Transactions
        </Link>
        <Link
          to="/budget"
          className="w-full text-gray-700 py-2 px-4 rounded mb-2 flex items-center hover:bg-purple-700"
        >
          <span className="mr-2">💰</span> Budget
        </Link>
        <Link
          to="/analytics"
          className="w-full text-gray-700 py-2 px-4 rounded mb-2 flex items-center hover:bg-purple-700"
        >
          <span className="mr-2">📈</span> Analytics
        </Link>
        <Link
          to="/goals"
          className="w-full text-gray-700 py-2 px-4 rounded mb-2 flex items-center hover:bg-purple-700"
        >
          <span className="mr-2">🎯</span> Goals
        </Link>
      </div>
      <div>
        <ThemeToggle />
      </div>
    </div>
  );
};

export default Sidebar;
