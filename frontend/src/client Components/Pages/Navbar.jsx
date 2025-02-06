import React, { useState, useEffect } from "react";
import logo from "../../images/assets/brahmmis logo recreate.png";
import { FaCartArrowDown } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCartTotalCount } from "../../store/reducers/CartReducers";

function Navbar() {
  const cartTotalCount = useSelector(selectCartTotalCount);
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="shadow sticky top-0 bg-gray-50 z-50 w-full">
      <div className="relative flex max-w-screen-xl flex-col overflow-hidden pt-2 md:mx-auto md:flex-row md:items-center">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center whitespace-nowrap text-2xl font-black"
        >
          <img
            src={logo}
            alt="Brand Logo"
            className="max-w-24 h-24"
            data-aos="fade-in"
            data-aos-duration="3000"
            style={{ width: "120px" }}
          />
        </Link>

        {/* Thirukural Text (Hidden on tablets and below) */}
        <div className="hidden lg:flex w-full flex-grow font-bold -translate-x-20 text-green-600 text-md justify-center items-center">
          <span>
            மருந்தென வேண்டாவாம் யாக்கைக்கு அருந்தியது
            <br />
            அற்றது போற்றி உணின்.
          </span>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="absolute top-5 right-7 cursor-pointer md:hidden"
          aria-label="Toggle Navigation"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        {/* Navigation Menu */}
        <nav
          aria-label="Header Navigation"
          className={`${
            isOpen ? "mt-1 max-h-56" : "max-h-0"
          } peer-checked:max-h-56 flex max-h-0 w-full flex-col items-center justify-between overflow-hidden transition-all lg:-ml-28 md:max-h-full md:flex-row md:items-center md:justify-between`}
        >
          <ul className="flex flex-col items-center space-y-2 md:flex-row md:space-y-0 md:space-x-6 w-full md:justify-end">
  {[
    { label: "Home", link: "/" },
    { label: "About Us", link: "/about-us" },
    { label: "Our Menu", link: "/our-menu" },
    { label: "Contact Us", link: "/contact" },
    {
      label: (
        <div className="flex items-center space-x-2">
          <FaCartArrowDown style={{ width: "32px", height: "22px" }} />
          <span>{cartTotalCount}</span>
        </div>
      ),
      link: "/addTocart",
    },
  ].map((item, index) => (
    <li
      key={index}
      className="text-black md:text-base hover:text-green-600"
      data-aos="fade-down"
      data-aos-duration={`${400 + index * 200}`}
    >
      <Link
        to={item.link}
        className="no-underline transition-all duration-300"
      >
        {item.label}
      </Link>
    </li>
  ))}
  <li
    className="text-[#000000] md:text-base p-2 hover:text-green-600 hover:font-bold"
    data-aos="fade-down"
    data-aos-duration="1400"
  >
    <Link
      to="/signin"
      className="bg-gray-600 text-white py-2 px-4 rounded-lg no-underline"
    >
      Login
    </Link>
  </li>
</ul>

        </nav>
      </div>
    </header>
  );
}

export default Navbar;
