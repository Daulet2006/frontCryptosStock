import React from "react";
import { Link } from "react-router-dom";
import { PlusCircle } from "lucide-react";

const Navbar = ({ onAddNew }) => {
  return (
    <nav className="bg-gray-900 text-white shadow-lg select-none">
  <div className="container mx-auto px-4 py-4 flex justify-between items-center">
    <div className="flex items-center">
      <svg
        className="h-8 w-8 text-green-500 mr-3"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M16 8l-8 8" />
        <path d="M8 8l8 8" />
      </svg>
      <span className="text-2xl font-bold">CryptoTracker</span>
    </div>

    <div className="flex space-x-6 items-center font-semibold">
      <Link to="/" className="hover:text-gray-300 transition">
        Dashboard
      </Link>
      <Link to="/chatbot" className="hover:text-gray-300 transition">
        ChatBot
      </Link>
      <Link to="/cryptocurrencies" className="hover:text-gray-300 transition">
        Currencies
      </Link>

      <Link to={`/cryptodashboard`} asChild>
        <button
          onClick={onAddNew}
          className="flex items-center bg-white text-gray-900 hover:bg-gray-300 px-4 py-2 rounded-md transition"
        >
          <PlusCircle className="h-5 w-5 mr-2" />
          Add New Asset
        </button>
      </Link>
    </div>
  </div>
</nav>

  );
};

export default Navbar;
