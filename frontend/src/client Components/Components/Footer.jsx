import React from 'react';
import logo from "../../images/assets/brahmmis logo recreate.png"
const Footer = () => {
  return (
    <footer className="bg-gray-300 font-sans tracking-wide font-bold">
      <div className="py-4 px-6 sm:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">

          {/* Logo and Description */}
          <div className="lg:col-span-2">
            <a href="javascript:void(0)">
              <img
                src={logo}
                alt="logo"
                className="w-44 mb-8"
              />
            </a>
            <p className="text-black text-sm w-1/2 font-bold">
            Explore the rich heritage of Tamil cuisine. In a world of fast food, we aim to bring back traditional flavors, celebrate local ingredients, and honor the wisdom of our ancestors.            </p>
          </div>

          {/* Products Section */}
          <div>
            <h4 className="text-lg font-semibold mb-8 text-black">Products</h4>
            <ul className="space-y-4">
              <li><a href="#our-menu" className="text-black hover:text-white text-sm no-underline">Sweets</a></li>
              <li><a href="#our-menu" className="text-black hover:text-white text-sm no-underline">Organic Mixer</a></li>
              <li><a href="#our-menu" className="text-black hover:text-white text-sm no-underline">Snacks</a></li>
            </ul>
          </div>

          {/* Useful Links Section */}
          <div>
            <h4 className="text-lg font-semibold mb-8 text-black">Privacy policies</h4>
            <ul className="space-y-4 mr-20">
              <li><a href="terms" className="text-black hover:text-white text-sm no-underline">Terms and Conditions</a></li>
              <li><a href="privacy" className="text-black hover:text-white text-sm no-underline">Privacy Policy</a></li>
              <li><a href="cancel" className="text-black hover:text-white text-sm no-underline">Cancellation, Return, and Refund Policy</a></li>
              <li><a href="ship" className="text-black hover:text-white text-sm no-underline">Shipping & Delivery Policy</a></li>
              {/* <li><a href="#contact" className="text-black hover:text-white text-sm no-underline">Help</a></li> */}
              {/* <li><a href="#contact" className="text-black hover:text-white text-sm no-underline">Contact</a></li> */}
            </ul>
          </div>

          {/* Contact Us Section */}
          <div>
            <h4 className="text-lg font-semibold mb-8 text-black">Contact Us</h4>
            <div className="space-y-4">
              <p className="text-black text-sm">
                14/29-2, Selvarajapuram, Pappampattiprivu, Behind Prasanthi Weigh Bridge, Next to Food in 641 Hotel, Chinthamanipudur Post, Irugur Via, Coimbatore - 641103
              </p>
              <p className="text-black text-sm">kovaimannvaasanai@gmail.com</p>
              <p className="text-black text-sm">+91 88705 66255</p>
            </div>
          </div>

        </div>
      </div>

      <div className="text-center py-2 bg-green-600">
        <p className="text-black text-sm">
          Copyright © 2024 Kovai Mannvasanai All Rights Reserved.❤ Prepared with Right Upnext Innovations.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
