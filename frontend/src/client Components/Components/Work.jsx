import React from 'react';
import { FaListAlt, FaWhatsapp, FaTruck } from 'react-icons/fa';

const Work = () => {
  return (
    <div className="container py-5">
      <h2 className="text-center mb-4 text-green-500">How It Works</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Step 1: Explore Our Menu */}
        <div className="card shadow-sm border rounded p-4 text-center" data-aos="fade-right">
          <div className="flex items-center justify-center mb-3 space-x-2">
            <FaListAlt size={30} className="text-green-500" />
            <h4>Explore Our Menu</h4>
          </div>
          <p>
            "Browse our website to explore our curated selection of premium organic foods. Discover the freshest, healthiest options to meet your needs."
          </p>
        </div>

        {/* Step 2: Order Easily on WhatsApp */}
        <div className="card shadow-sm border rounded p-4 text-center" data-aos="fade-up">
          <div className="flex items-center justify-center mb-3 space-x-2">
            <FaWhatsapp size={30} className="text-green-500" />
            <h4>Order Easily on WhatsApp</h4>
          </div>
          <p>
            "Simply select your desired items from the menu and place your order through WhatsApp. Our team is ready to assist you with a smooth and easy ordering process."
          </p>
        </div>

        {/* Step 3: Prompt Delivery to Your Doorstep */}
        <div className="card shadow-sm border rounded p-4 text-center" data-aos="fade-left">
          <div className="flex items-center justify-center mb-3 space-x-2">
            <FaTruck size={30} className="text-green-500" />
            <h4>Swift Delivery to Your Door</h4>
          </div>
          <p>
            "Once your order is placed, we take care of the rest! Enjoy quick and reliable delivery, bringing fresh organic foods right to your doorstep for your convenience."
          </p>
        </div>
      </div>
    </div>
  );
};

export default Work;
