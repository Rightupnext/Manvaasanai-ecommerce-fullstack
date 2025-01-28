import React, { useState } from "react";
import organic from "../../images/assets/organic.jpg";

const Organic = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const addresses = [
    {
      name: "அமரர் டாக்டர் உயர்திரு. பஸ்லூர் ரஹ்மான்",
      qualifications: "MBBS DV MD PhD (Acu)",
      location: "சென்னை",
      details: [
        "பரப்புரை உலகெங்கும்",
        "உண்மையின் உரைகல்",
        "நவீன மருத்துவம் Vs ஹோமியோ, சித்தா, ஆயுர்வேதிக், மற்றும் தொடுமுறை சிகிச்சை முறைகள்",
      ],
    },
    {
      name: "பவித்ரா இயற்கை மருத்துவமனை",
      location: "மருதமலை ரோடு, கோவை",
    },
    {
      name: "Divya Bharathi Naturopathy Clinic",
      tamilName: "திவ்ய பாரதி நேட்சுரோபதி கிளீனிக்",
      locations: ["மதுக்கரை, கோவை", "உடுமலைப் பேட்டை"],
    },
    {
      name: "Dr. யோகேஷ்வர்",
      tamilName: "காய்கறி மருத்துவ மையம்",
      englishName: "Vegetable Medicine Clinic",
      locations: [
        "உப்பிலிபாளையம், சிங்காநல்லூர், கோவை",
        "அவினாசி சாலை, கருமத்தம்பட்டி",
      ],
    },
  ];

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div>
      <div
        className="min-h-screen bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage: `url(${organic})`, // Background image
        }}
      >
        <div className="w-full max-w-3xl p-4 rounded-lg shadow-md text-center font-bold">
          <p className="text-lg md:text-sm font-bold mb-4">
            இயற்கை அங்காடிகளில் விலை அதிகம் என்பது மக்களிடையே பொதுவான, பரவலான கருத்தாக இருக்கிறது.
            ஆனால் பொருட்களின் பயன்பாடு மக்களிடையே அதிகமாகும் போதுதான், விலை என்பது குறையும்.
          </p>
          <p className="text-lg md:text-sm font-bold mb-4">
            உதாரணமாக கைபேசி வந்த புதிதில் உள்வரும் அழைப்புகளுக்கே நிமிடத்திற்கு அதிக தொகை
            ரூ.16 வரை கொடுத்தோம். ஆனால் <em>consumption</em> அதிகமாகும் போது
            (இன்று cell phone பயன்படுத்தாதவர்களே இல்லை எனலாம்), அதாவது பயன்பாடு
            அதிகரித்த பின், பைசா கணக்கீடு என்பது கைபேசி கட்டணத்தில் கடைபிடிக்கப்படுகிறது.
          </p>
          <p className="text-lg md:text-sm font-bold mb-4">
            அது போல் ஒவ்வொரு இயற்கை அங்காடிகளிலும் பயன்பாட்டாளர்கள் அதிகரிக்கும்
            போதுதான் விலையும் குறையும். 100 கிலோ தக்காளிக்குக் கொடுக்கும்
            வண்டி வாடகையை 10-20 கிலோவிற்குக் கொடுக்கும் போது கடைக்காரர்கள் குறைந்த
            அளவு பொருட்களுடன் சேர்க்கும் போது <em>cost</em> அதிகமாகிறது.
            அதிகமான வாடிக்கையாளர்கள் சேரும்போது விலை குறையும்.
          </p>
          <p className="text-lg md:text-sm font-bold">
            அதனால் பூச்சிக்கொல்லி எனும் நஞ்சில்லா, இயற்கைப் பொருட்களின் அருமையை
            உணர்ந்து, பயன்பாட்டை அதிகரிப்போம், இயற்கையோடு அடுத்த தலைமுறைகளையும்
            நோயிலிருந்து காப்போம்...
          </p>
          <p>ஆங்கில மருத்துவத்தின் பக்க விளைவுகளுக்கு எதிரான இயற்கை மருத்துவ முறைகள்
          </p>
          <button
            className="px-4 py-2 bg-green-500 text-white rounded-lg"
            onClick={toggleModal}
          >
            மேலும்..
          </button>
        </div>

      </div>


      {isModalOpen && (
       <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
       <div className="bg-white max-w-7xl p-6 rounded-lg shadow-lg overflow-y-auto max-h-[80vh]">
         <h2 className="text-xl font-bold mb-6 text-center text-gray-800">
           மருத்துவ மையங்கள்
         </h2>
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
           {addresses.map((address, index) => (
             <div
               key={index}
               className="p-4 border rounded-lg shadow-md bg-gray-50 text-center"
             >
               <h3 className="font-bold text-lg mb-2 text-green-700">
                 {address.name}
               </h3>
               {address.qualifications && (
                 <p className="italic text-sm mb-2 text-gray-700">
                   {address.qualifications}
                 </p>
               )}
               <p className="mb-2 text-gray-600">{address.location}</p>
               {address.details && (
                 <ul className="list-disc list-inside text-left text-gray-600">
                   {address.details.map((detail, i) => (
                     <li key={i}>{detail}</li>
                   ))}
                 </ul>
               )}
               {address.locations && (
                 <ul className="list-disc list-inside text-left text-gray-600">
                   {address.locations.map((loc, i) => (
                     <li key={i}>{loc}</li>
                   ))}
                 </ul>
               )}
             </div>
           ))}
         </div>
         <div className="mt-6 text-center">
           <button
             className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-300"
             onClick={toggleModal}
           >
             Close
           </button>
         </div>
       </div>
     </div>
     
      )}
    </div>
  );
};

export default Organic;
