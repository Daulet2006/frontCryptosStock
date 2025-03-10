import React from "react";
import Navbar from "./components/NavBar";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

function App() {
  return (
    <div className="min-h-screen bg-white text-black select-none">
      <Navbar />
      <main className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-5xl font-bold mb-6">Welcome to CryptoTracker</h1>
        <p className="text-lg mb-6">Track and manage your crypto assets easily.</p>
        <div className="flex justify-center gap-4">
          <Link
            to="/cryptocurrencies"
            className="bg-black hover:bg-white text-white hover:text-black hover:border border-black px-6 py-3 rounded-md transition font-semibold"
          >
            View Cryptocurrencies
          </Link>
          <Link
            to="/cryptodashboard"
            className="bg-white flex gap-1 pr-5 items-center hover:bg-black hover:text-white text-black border border-black font-semibold px-6 py-3 rounded-md transition"
          >
            <span>Manage Assets</span>
            <ArrowUpRight className="pt-[3px]" />
          </Link>
        </div>
      </main>
    </div>
  );
}

export default App;
