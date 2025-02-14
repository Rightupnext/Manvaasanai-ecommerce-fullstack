import React, { useState, useEffect } from "react";
import { FaUtensils, FaPizzaSlice, FaHamburger } from "react-icons/fa";
import { MdOutlineFoodBank } from "react-icons/md";
import { GiCookingPot } from "react-icons/gi";

const Loader = ({ timeout = 30000 }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (loading) {
        setError(true);
        setLoading(false);
      }
    }, timeout);

    return () => clearTimeout(timer);
  }, [loading, timeout]);

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-orange-50">
        <div className="text-center text-red-600">
          <p>Loading took too long. Please try again.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-green-50" 
         role="alert" 
         aria-label="Loading content">
      <div className="relative">
        {/* Main Circle */}
        <div className="w-32 h-32 rounded-full border-4 border-green-400 animate-spin"></div>

        {/* Rotating Icons */}
        <div className="absolute inset-0 flex items-center justify-center animate-spin-slow">
          <div className="grid grid-cols-2 gap-4">
            <FaUtensils className="text-[#8B4513] text-2xl transform hover:scale-110 transition-all duration-300" />
            <FaPizzaSlice className="text-[#FFA500] text-2xl transform hover:scale-110 transition-all duration-300" />
            <GiCookingPot className="text-[#8B4513] text-2xl transform hover:scale-110 transition-all duration-300" />
            <FaHamburger className="text-[#FFA500] text-2xl transform hover:scale-110 transition-all duration-300" />
          </div>
        </div>

        {/* Center Food Icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <MdOutlineFoodBank className="text-[#2ecc71] text-4xl animate-bounce" />
        </div>

        {/* Pulse Effect */}
        <div className="absolute -inset-4">
          <div className="w-40 h-40 rounded-full bg-green-200 animate-pulse opacity-20"></div>
        </div>
      </div>

      {/* Loading Text */}
      <div className="absolute mt-60 text-[#13ff27] font-medium text-xl">
        <p className="animate-pulse">Please Wait...</p>
      </div>
    </div>
  );
};

export default Loader;