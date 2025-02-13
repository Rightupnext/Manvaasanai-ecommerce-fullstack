import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaCartArrowDown } from "react-icons/fa";
import { selectCartTotalCount } from "../../store/reducers/CartReducers";
import logo from "../../images/assets/brahmmis logo recreate.png";

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
        <Link to="/" className="flex items-center whitespace-nowrap text-2xl font-black">
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

        {/* Toggle Button & Cart Icon (Always Visible on sm) */}
        <div className="absolute top-5 right-7 flex items-center space-x-4 md:right-7">
          {/* Cart Icon (Visible on sm) */}
          <Link to="/addTocart" className="relative flex items-center md:hidden">
            <FaCartArrowDown className="w-6 h-6 text-black" />
            {cartTotalCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                {cartTotalCount}
              </span>
            )}
          </Link>

          {/* Toggle Button (Hidden on md & lg) */}
          <button onClick={toggleMenu} className="cursor-pointer sm:block md:hidden lg:hidden" aria-label="Toggle Navigation">
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Navigation Menu */}
        <nav
          aria-label="Header Navigation"
          className={`${
            isOpen ? "mt-1 max-h-80" : "max-h-0"
          } peer-checked:max-h-80 flex max-h-0 w-full flex-col items-center justify-between overflow-hidden transition-all lg:-ml-28 md:max-h-full md:flex-row md:items-center md:justify-between lg:space-x-6`}
        >
          {/* Navigation Menu */}
          <div className="flex flex-col items-center w-full md:flex-row md:justify-end md:space-x-4 lg:space-x-6">
            <ul className="flex flex-col items-center w-full md:flex-row md:justify-end md:space-x-4">
              {[
                { label: "Home", link: "/" },
                // { label: "About Us", link: "/about-us" },
                { label: "Our Menu", link: "/products" },
                { label: "Contact Us", link: "/contact-us" },
              ].map((item, index) => (
                <React.Fragment key={index}>
                  <li
                    className="text-black md:text-base hover:text-green-600 text-center w-full md:w-auto py-2"
                    data-aos="fade-down"
                    data-aos-duration={`${400 + index * 200}`}
                  >
                    <Link to={item.link} className="no-underline transition-all duration-300">
                      {item.label}
                    </Link>
                  </li>
                  {/* Horizontal line on small screens */}
                  {index !== 3 && <hr className="w-full border-gray-300 md:hidden" />}
                </React.Fragment>
              ))}
            </ul>

            {/* Cart Icon (Now inside menu on lg screens) */}
            <li className="hidden md:flex justify-center items-center py-2 md:ml-4 md:mr-2 lg:ml-4 mr-2">
              <Link to="/addTocart" className="relative flex items-center">
                <FaCartArrowDown className="w-6 h-6 text-black" />
                {cartTotalCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                    {cartTotalCount}
                  </span>
                )}
              </Link>
            </li>

          </div>

          {/* Login Button */}
          <div className="flex justify-center w-full md:w-auto py-2 md:ml-4 lg:ml-6">
            <Link
              to="/signin"
              className="bg-gray-600 text-white py-2 px-4 rounded-lg no-underline text-center min-w-[100px] md:min-w-[120px] hover:bg-black transition duration-300"
            >
              Login
            </Link>
          </div>


        </nav>
      </div>
    </header>
  );
}

export default Navbar;
