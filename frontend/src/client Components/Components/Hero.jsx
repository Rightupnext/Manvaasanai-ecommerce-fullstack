import React from "react";
import nammalvar from "../../images/assets/ural.jpeg";
import ural from "../../images/assets/ural Image.jpeg";
import green from "../../images/assets/bg2.jpg";

const Hero = () => {
  return (
    <div
      className="flex flex-col items-center w-full h-[100%] pt-10"
      style={{
        backgroundImage: `url(${green})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Title Section */}
      
      <h1 className="text-center text-3xl md:text-4xl text-green-400 font-bold mt-10">
        ஈடில்லா இயற்கை வேளாண்மை
        {" "}
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 h-full w-full px-4 py-32 gap-6 items-center">
        {/* Nammalvar Image */}
        <div
          className="flex justify-center"
          data-aos="fade-right"
          data-aos-duration="1500"
        >
          <img
            src={nammalvar}
            alt="Nammalvar - Pioneer of Natural Farming"
            className="w-60 h-60 sm:w-80 sm:h-80 object-cover rounded-lg shadow-lg"
          />
        </div>

        {/* Text Section */}
        <div
          className="bg-white p-4 sm:p-6 md:p-8 rounded-2xl shadow-lg max-w-xl sm:max-w-2xl lg:max-w-3xl xl:max-w-4xl mx-auto text-center"
          data-aos="fade-down"
          data-aos-duration="1500"
        >
          <p className="text-gray-800 text-xs sm:text-sm md:text-sm leading-relaxed">
            பாட்டன், பூட்டன், அப்பன், ஆத்தா ஆண்டாண்டு காலமாய் செய்திட்ட வேளாண்மை..
            <br /><br />
            மனையெல்லாம் உணவு, தானியங்களாய், அகமும் புறமும் நிறைந்திட்ட வேளாண்மை..
            <br /><br />
            சூழலை ஒரு கூறாய்
            அதில் தான் ஒரு பகுதியாய்
            காற்றும் ஒளியும் மட்டுமே அயற்பொருளாய்ப் பெற்ற வேளாண்மை..
            <br /><br />
            விதைகளையும் விளைவிக்கும் வித்தைகளையும் தன்னுள்ளே கொண்டு
            தங்களுக்குள் வேலைகளை குறிகாப்பாய்
            விற்பனையை பண்டமாற்றாய் வாழ்ந்திட்ட வேளாண்மை..
            <br /><br />
            சீர்தானியங்களை பேரளவில் விளைவித்து மானுட நலன் மட்டுமின்றி நீரையும் நிலத்தையும்
            சுரண்டாமல் வாழ்ந்திட்ட வேளாண்மை..
            <br /><br />
            வாய்க்காலில் வரும் நீரைப் பருகி, அடிபட்ட காயத்துக்கு மண்ணையே
            மருந்தாக்கி, விளையாட்டாக மண்ணைக் கூட வாயில் இடும் நற்சூழல் கொண்ட வேளாண்மை..
            <br /><br />
            அது இயற்கை முறை வேளாண்மை...
            <br /><br />
            திட்டமிட்டு அழிக்கப்பட்ட இந்த வாழ்வியல் முறையை மீட்டெடுக்க வந்த பேராசான் நம்மாழ்வார்
            வழி நடப்போம்.
            நம் எதிர்காலத் தலைமுறையிடம் கடன் பெற்ற இப்புவியை
            சூழல் மாறாமல் அவர்களிடம் கையளிப்போம்...
          </p>

        </div>

        {/* Ural Image */}
        <div
          className="flex justify-center"
          data-aos="fade-left"
          data-aos-duration="1500"
        >
          <img
            src={ural}
            alt="Ural - Agriculture and Environment"
            className="w-60 h-60 sm:w-80 sm:h-80 object-cover rounded-lg shadow-lg"
          />
        </div>
      </div>
      <div className="text-center flex flex-col justify-center">
          <p className="text-white text-2xl sm:text-2xl  mb-8 font-bold px-4 sm:px-0">
            முழுக்க முழுக்க பெண்களால் தயாரிக்கப்பட்டு பழங்கால, பாரம்பரிய முறையில் <br/>பாட்டி, அப்பத்தா காலத்தை மீட்டெடுத்து உடலுக்கு வலுவூட்டி உரமூட்டும் பலகாரங்கள்.
          </p>

          <button 
            type="button" 
            className="bg-gradient-to-r hover:bg-gradient-to-l from-green-600 to-green-800 hover:bg-green-500 text-white tracking-wide font-semibold text-sm py-3 px-6 rounded-lg w-max mx-auto mt-4 transition duration-300"
          >
            Shop Now
          </button>
        </div>
    </div>
  );
};

export default Hero;
