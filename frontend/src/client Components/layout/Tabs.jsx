import React, { useState } from "react";
import Reviews from "./Reviews";
import NutritionalInformation from "./NutritionalInformation";

function Tabs({product}) {
  const [activeTab, setActiveTab] = useState("nutritional"); // Default tab

  return (
    <div className="font-sans p-4">
      <ul className="flex">
        {/* Nutritional Information Tab */}
        <li
          className={`tab flex items-center justify-center font-bold text-[15px] py-3.5 px-7 border-b-2 cursor-pointer ${
            activeTab === "nutritional"
              ? "text-green-600 bg-blue-50 border-green-600"
              : "text-gray-600 border-gray-300"
          }`}
          onClick={() => setActiveTab("nutritional")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            className="w-4 mr-3"
            viewBox="0 0 511 511.999"
          >
            <path d="M498.7 222.695c-.016-.011-.028-.027-.04-.039L289.805..." />
          </svg>
          Nutritional Information
        </li>

        {/* Reviews Tab */}
        <li
          className={`tab flex items-center justify-center font-bold text-[15px] py-3.5 px-7 border-b-2 cursor-pointer ${
            activeTab === "reviews"
              ? "text-green-600 bg-blue-50 border-green-600"
              : "text-gray-600 border-gray-300"
          }`}
          onClick={() => setActiveTab("reviews")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            stroke="currentColor"
            className="w-4 mr-3"
            viewBox="0 0 682.667 682.667"
          >
            <path d="M256 334.666c-43.446 0-78.667-35.22-78.667-78.667..." />
          </svg>
          Reviews
        </li>
      </ul>

      {/* Conditional Rendering of Components */}
      <div className="mt-4">
        {activeTab === "nutritional" && <NutritionalInformation product={product}/>}
        {activeTab === "reviews" && <Reviews />}
      </div>
    </div>
  );
}

export default Tabs;
