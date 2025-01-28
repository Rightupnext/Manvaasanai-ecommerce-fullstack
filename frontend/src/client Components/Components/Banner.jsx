import React from 'react';
import ural from "../../images/assets/ural Image.jpeg";
import background from "../../images/assets/background.jpg";

const Banner = () => {
  return (
    <div 
      className="bg-gray-100 w-full font-[sans-serif] relative rounded overflow-hidden" 
      style={{ backgroundImage: `url(${background})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}
    >
      <div className="grid sm:grid-cols-2 gap-6 py-12 px-6 max-sm:gap-8">
        <div className="bg-gradient-to-tr px-4 py-8 text-center rounded-3xl h-full mx-auto shadow-lg shadow-purple-400">
          <img src={ural} alt="Ural" className="w-full h-auto max-h-[300px] object-cover rounded-md mt-4" data-aos="fade-down"/>
        </div>

        <div className="text-center flex flex-col justify-center">
          <p className="text-gray-800 text-2xl sm:text-2xl mt-4 mb-6 font-bold px-4 sm:px-0">
            முழுக்க முழுக்க பெண்களால் தயாரிக்கப்பட்டு பழங்கால, பாரம்பரிய முறையில் <br/>பாட்டி, அப்பத்தா காலத்தை மீட்டெடுத்து உடலுக்கு வலுவூட்டி உரமூட்டும் பலகாரங்கள்.
          </p>

          <button 
            type="button" 
            className="bg-gradient-to-r hover:bg-gradient-to-l from-green-600 to-green-800 hover:bg-green-500 text-white tracking-wide font-semibold text-sm py-3 px-6 rounded-lg w-max mx-auto mt-8 transition duration-300"
          >
            Shop Now
          </button>
        </div>
      </div>
      
    </div>
  );
};

export default Banner;
