import React from 'react';
import pongar from "../../images/assets/pongar.png";
import mappilai from "../../images/assets/mappilai samba.png";
import seragasamba from "../../images/assets/seraga samba 1.png";
import navarasa from "../../images/assets/navarasa.jpg";
import karuppukavuni from "../../images/assets/karuppu kavuni.png";
import brown from "../../images/assets/brown.jpg";

const riceVarieties = [
    { name: 'கருப்புக்கவுணி அரிசி', benefits: 'புற்று நோய் வராது, இன்சுலின் சுரக்கும்' },
    { name: 'மாப்பிள்ளை சம்பா அரிசி', benefits: 'நரம்பு, உடல் வலுவாகும், ஆண்மை கூடும்' },
    { name: 'பூங்கார் அரிசி', benefits: 'சுகப்பிரசவம் ஆகும். தாய்ப்பால் ஊறும்' },
    { name: 'காட்டுயானம் அரிசி', benefits: 'நீரழிவு, மலச்சிக்கல், புற்று நோய் சரியாகும்' },
    { name: 'கருத்தார் அரிசி', benefits: 'மூலம், மலச்சிக்கல் சரியாகும்' },
    { name: 'காலா நமக் அரிசி', benefits: 'மூளை, நரம்பு,இரத்தம், சீறுநீரகம், சரியாகும்' },
    { name: 'மூங்கில் அரிசி', benefits: 'மூட்டுவலி, முழங்கால் வலி சரியாகும்' },
    { name: 'அறுபதாம் குறுவை அரிசி', benefits: 'எலும்பு சரியாகும்' },
    { name: 'இலுப்பைப்பூ சம்பா அரிசி', benefits: 'பக்கவாதம், கால் வலி சரியாகும்' },
    { name: 'தங்கச்சம்பா அரிசி', benefits: 'பல், இதயம் வலுவாகும்' },
    { name: 'கருங்குருவை அரிசி', benefits: 'இழந்த சக்தியை மீட்கும், கொடிய நோய்கள் குணமாகும்' },
    { name: 'கருடன் சம்பா அரிசி', benefits: 'இரத்தம், உடல், மனம் சுத்தமாகும்' },
    { name: 'கார் அரிசி', benefits: 'தோல் நோய் சரியாகும்' },
    { name: 'குடை வாழை அரிசி', benefits: 'குடல் சுத்தமாகும்' },
    { name: 'கிச்சிலி சம்பா அரிசி', benefits: 'இரும்பு சத்து, சுண்ணாம்பு சத்து அதிகம்' },
    { name: 'நீலம் சம்பா அரிசி', benefits: 'இரத்த சோகை நீங்கும்' },
    { name: 'சீரக சம்பா அரிசி', benefits: 'அழகு தரும், எதிர்ப்பு சக்தி கூடும்' },
    { name: 'தூயமல்லி அரிசி', benefits: 'உள் உறுப்புகள் வலுவாகும்' },
    { name: 'குழியடிச்சான் அரிசி', benefits: 'தாய்ப்பால் ஊறும்' },
    { name: 'சேலம் சன்னா அரிசி', benefits: 'தசை, நரம்பு, எலும்பு வலுவாகும்' },
    { name: 'பிசினி அரிசி', benefits: 'மாத விடாய் இடுப்பு வலி சரியாகும்' },
    { name: 'சூரக்க குறுவை அரிசி', benefits: 'பெருத்த உடல் சிறுத்து அழகு கூடும்' },
    { name: 'வாலான் சம்பா அரிசி', benefits: 'சுகப்பிரசவம் ஆகும், இடுப்பு வலுவாகும்' },
    { name: 'வாடன்சம்பா அரிசி', benefits: 'அமைதியான தூக்கம் வரும்' },
];

const Rice = () => {
    return (
        <div className="bg-gray-200 py-10 px-4">
            <h1 className="text-2xl font-bold text-green-800 text-center mb-6">
                நம் முன்னோர்கள் பயன்படுத்திய அரிசி வகைகளின் பலன்கள்
            </h1>
            <div className="max-w-7xl mx-auto">
                {/* First Row: Image on Left and 4 Boxes on Right */}
                <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
                    <div className="col-span-1 flex items-center justify-center">
                        <div className="w-56 h-52 rounded-full flex items-center justify-center">
                            <img
                                src={pongar}
                                alt="Pongar Rice"
                                className="w-full h-full object-cover rounded-full"
                            />
                        </div>
                    </div>
                    <div className="col-span-4 grid grid-cols-2 gap-6">
                        {riceVarieties.slice(0, 4).map((rice, index) => (
                            <div key={index} className="bg-green-500 shadow-xl rounded-xl p-2 flex flex-col items-center justify-center">
                                <h3 className="font-bold text-white text-lg">{rice.name}</h3>
                                <p className="text-sm font-bold text-black">{rice.benefits}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Second Row: Image on Right and 4 Boxes on Left */}
                <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 mt-8">
                    <div className="col-span-4 grid grid-cols-2 gap-6">
                        {riceVarieties.slice(4, 8).map((rice, index) => (
                            <div key={index} className="bg-white shadow-xl rounded-xl p-2 flex flex-col items-center justify-center">
                                <h3 className="font-bold text-green-500 text-lg">{rice.name}</h3>
                                <p className="text-sm font-bold text-gray-700">{rice.benefits}</p>
                            </div>
                        ))}
                    </div>
                    <div className="col-span-1 flex items-center justify-center">
                        <div className="w-40 h-40 rounded-full flex items-center justify-center">
                            <img
                                src={mappilai}
                                alt="Mappilai Samba Rice"
                                className="w-full h-full object-cover rounded-full"
                            />
                        </div>
                    </div>
                </div>

                {/* Third Row: Image on Left and 4 Boxes on Right */}
                <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 mt-8">
                    <div className="col-span-1 flex items-center justify-center">
                        <div className="w-40 h-40 rounded-full flex items-center justify-center hidden lg:blockhidden lg:block">
                            <img
                                src={seragasamba}
                                alt="Seraga Samba Rice"
                                className=" w-full h-full object-cover rounded-full"
                            />
                        </div>
                    </div>
                    <div className="col-span-4 grid grid-cols-2 gap-6">
                        {riceVarieties.slice(8, 12).map((rice, index) => (
                            <div key={index} className="bg-green-500 shadow-xl rounded-xl p-2 flex flex-col items-center justify-center">
                                <h3 className="font-bold text-white text-lg">{rice.name}</h3>
                                <p className="text-sm font-bold text-black">{rice.benefits}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Fourth Row: Image on Right and 4 Boxes on Left */}
                <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 mt-8">
                    <div className="col-span-4 grid grid-cols-2 gap-6">
                        {riceVarieties.slice(12, 16).map((rice, index) => (
                            <div key={index} className="bg-white shadow-xl rounded-xl p-2 flex flex-col items-center justify-center">
                                <h3 className="font-bold text-green-500 text-lg">{rice.name}</h3>
                                <p className="text-sm font-bold text-gray-700">{rice.benefits}</p>
                            </div>
                        ))}
                    </div>
                    <div className="col-span-1 flex items-center justify-center">
                        <div className="w-44 h-40 rounded flex items-center justify-center hidden lg:block">
                            <img
                                src={brown}
                                alt="Navarasa Rice"
                                className="w-full h-full object-cover rounded"
                            />
                        </div>
                    </div>

                </div>

                {/* Fifth Row: Image on Left and 4 Boxes on Right */}
                <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 mt-8">
                    <div className="col-span-1 flex items-center justify-center">
                        <div className="w-40 h-40 rounded-full flex items-center justify-center">
                            <img
                                src={karuppukavuni}
                                alt="Karuppu Kavuni Rice"
                                className="w-full h-full object-cover rounded-full"
                            />
                        </div>
                    </div>
                    <div className="col-span-4 grid grid-cols-2 gap-6">
                        {riceVarieties.slice(16, 20).map((rice, index) => (
                            <div key={index} className="bg-green-500 shadow-xl rounded-xl p-2 flex flex-col items-center justify-center">
                                <h3 className="font-bold text-white text-lg">{rice.name}</h3>
                                <p className="text-sm font-bold text-black">{rice.benefits}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Sixth Row: Image on Right and 4 Boxes on Left */}
                <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 mt-8">
                    <div className="col-span-4 grid grid-cols-2 gap-6">
                        {riceVarieties.slice(20, 24).map((rice, index) => (
                            <div key={index} className="bg-white shadow-xl rounded-xl p-2 flex flex-col items-center justify-center">
                                <h3 className="font-bold text-green-500 text-lg">{rice.name}</h3>
                                <p className="text-sm font-bold text-gray-700">{rice.benefits}</p>
                            </div>
                        ))}
                    </div>
                    <div className="col-span-1 flex items-center justify-center">
                        <div className="w-60 h-40 rounded flex items-center justify-center">
                            <img
                                src={navarasa}
                                alt="Navarasa Rice"
                                className="w-full h-full object-cover rounded"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Rice;
