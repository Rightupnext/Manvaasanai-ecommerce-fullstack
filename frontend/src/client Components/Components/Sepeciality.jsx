import React from 'react';
import box from '../../images/assets/brammis sugarcane Box.png';
import greenish from '../../images/assets/greenish1..png';

function Blog() {
  return (
    <section className="bg-gray-100 py-16 relative overflow-hidden" id="specialty">
      <div className="container mx-auto px-4 relative z-10">
        {/* Flexbox container for title and description */}
        <div className="flex flex-col lg:flex-row items-center lg:items-start text-center lg:text-left mb-12 gap-10">
          {/* Text Section */}
          <div className="lg:w-2/3">
            <span className="text-4xl font-bold text-green-600 mb-4 block">Our Specialty</span>
            <h2 className="text-2xl lg:text-4xl font-semibold text-gray-800 mb-6">
              Packing in a box made from sugar cane
            </h2>
            <p className="text-lg text-gray-600 mb-4">
              Packaging made from sugarcane fiber is eco-friendly, biodegradable, and compostable. It reduces environmental impact while providing durable solutions for both hot and cold foods. Choose sugarcane fiber packaging to support sustainability and a greener future.
            </p>
            <p className="font-bold text-gray-800 mt-4 mb-32 leading-relaxed">
              இவ்வகை பெட்டிகள் சுற்றுச்சூழலுக்கு கேடு விளைவிக்காததும் மக்கும் தன்மை உள்ளதாலும் இயற்கையின் பாதைகுச் செல்ல வழிவகுக்கிறது.
              <br /><br />
              இயற்கையைப் பாதுகாப்பவன் ..<br />
              இறைவனையே பாதுகப்பவனாவான்..
              <br /><br />
              மாற்றத்தை நோக்கிய முதல்படியாகவும்..<br />
              இயற்கையைப் நோக்கிய இறுதிபடியாகவும் ..<br />
              இயற்கை அங்காடியை நாடுவோம்.."
            </p>
          </div>

          {/* Image Section */}
          <div className="lg:w-1/2 flex justify-center">
            <img
              src={box}
              className="max-w-full h-full rounded-lg shadow-md"
              alt="Sugarcane Packaging Box"
            />
          </div>
        </div>
      </div>

      {/* Background Image */}
      <img
        src={greenish}
        className="absolute bottom-0 left-0 w-full h-[400px] object-fit"
        alt="Greenish Background"
      />
    </section>
  );
}

export default Blog;
