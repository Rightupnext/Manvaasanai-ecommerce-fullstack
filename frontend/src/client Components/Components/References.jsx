import React, { useState } from "react";
import { FaLeaf, FaSeedling } from "react-icons/fa"; // Importing necessary icons
import green from "../../images/assets/greenish1.jpg";

// Top references data
const topReferences = [
    {
        title: "ஆசான் நம்மாழ்வாரின் 'வானகம்'",
        details: "நம்மாழ்வார் உயிர்ச்சூழல் நடுவம், கடவூர், கருமான்பட்டி, கரூர்.",
    },
    {
        title: "இயற்கை மற்றும் பழங்குடி மாமக்களின் நலன் விரும்பி.. தற்சார்பு வாழ்வியலின் ஆசான். திரு. ம.செந்தமிழன்",
        details: "திருமதி.காந்திமதி செந்தமிழன், செம்மைவனம், செங்கிப்பட்டி, தஞ்சாவூர்.",
    },
    {
        title: "கோவையின் நம்மாழ்வார்",
        details: "திரு.தங்கவேல் அய்யா, முன்னோடி இயற்கை விவசாயி, அத்தப்பகவுண்டன்புதூர், கோவை-641103.",
    },
];

// Additional references data
const references = [
    {
        title: "Indian Medical Council 2024-ம் ஆண்டுக்கான விருது பெற்றதுமான Zoy Herbal Sanitary Napkin",
        details: (
            <>
                <p>
                    <strong>இயற்கை மூலிகை Napkin</strong> - Zoy Herbal Sanitary Napkin,<br />
                    <a
                        href="https://www.zoycare.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline"
                    >
                        www.zoycare.com
                    </a>
                </p>
            </>
        ),
        icon1: <FaLeaf className="text-green-600 text-4xl mb-3" />,
        icon2: <FaSeedling className="text-green-600 text-4xl mt-3" />,
    },
    {
        title: "சுகம் இயற்கை அங்காடி",
        details: "அவினாசி சாலை, கோல்டுவின்ஸ், கோவை.",
        icon1: <FaLeaf className="text-green-600 text-4xl mb-3" />,
        icon2: <FaSeedling className="text-green-600 text-4xl mt-3" />,
    },
    {
        title: "செம்புலம் இயற்கை விவசாயிகளின் கூட்டமைப்பு",
        details: "தாராபுரம், திருப்பூர். (கோவை மற்றும் திருப்பூருக்கு நேரடி வழங்கல் மற்றும் தமிழகம் முழுவதும் Courier Service)",
        icon1: <FaLeaf className="text-green-600 text-4xl mb-3" />,
        icon2: <FaSeedling className="text-green-600 text-4xl mt-3" />,
    },
    {
        title: "திரு. பொன்முத்து",
        details: "சிவன் சந்தை, பல்லடம்.",
        icon1: <FaLeaf className="text-green-600 text-4xl mb-3" />,
        icon2: <FaSeedling className="text-green-600 text-4xl mt-3" />,
    },
    {
        title: "செஞ்சோலை இயற்கை வழி வேளாண் பயிற்சிப் பண்ணை",
        details: "இயற்கை வழி உழவர்களின் நேரடி சந்தை, சூலூர்.",
        icon1: <FaLeaf className="text-green-600 text-4xl mb-3" />,
        icon2: <FaSeedling className="text-green-600 text-4xl mt-3" />,
    },
    {
        title: "இயல் வணிகம் இயற்கை அங்காடி",
        details: "அவினாசி சாலை, கோல்டுவின்ஸ், கோவை.",
        icon1: <FaLeaf className="text-green-600 text-4xl mb-3" />,
        icon2: <FaSeedling className="text-green-600 text-4xl mt-3" />,
    },
    {
        title: "இயல் வணிகம், இயற்கை அங்காடி",
        details: "ராஜீவ் காந்தி நகர், G.V. Residency, சிங்காநல்லூர், கோவை.",
        icon1: <FaLeaf className="text-green-600 text-4xl mb-3" />,
        icon2: <FaSeedling className="text-green-600 text-4xl mt-3" />,
    },
    {
        title: "ஐந்தினை அற்றில் இயற்கை உணவகம்",
        details: "ராஜீவ் காந்தி நகர், G.V. Residency, சிங்காநல்லூர், கோவை.",
        icon1: <FaLeaf className="text-green-600 text-4xl mb-3" />,
        icon2: <FaSeedling className="text-green-600 text-4xl mt-3" />,
    },
    {
        title: "திரு. படையல் சிவக்குமார்",
        details: "அடுப்பில்லா சமையலில் உலக சாதனை, கோவை.",
        icon1: <FaLeaf className="text-green-600 text-4xl mb-3" />,
        icon2: <FaSeedling className="text-green-600 text-4xl mt-3" />,
    },

    {
        title: "சோற்றுக் கற்றாழை இராமசாமி அய்யா",
        details: "காரமடை, கோவை.",
        icon1: <FaLeaf className="text-green-600 text-4xl mb-3" />,
        icon2: <FaSeedling className="text-green-600 text-4xl mt-3" />,
    },
    {
        title: "திரு. நாட்டுமாடு செந்தில்",
        details: "கண்ணம்பாளையம், சூலூர், கோவை.",
        icon1: <FaLeaf className="text-green-600 text-4xl mb-3" />,
        icon2: <FaSeedling className="text-green-600 text-4xl mt-3" />,
    },
    {
        title: "தமிழ்பாரதி இயற்கை உணவகம்",
        details: "திரு. கருணாநிதி, சிங்காநல்லூர், கோவை.",
        icon1: <FaLeaf className="text-green-600 text-4xl mb-3" />,
        icon2: <FaSeedling className="text-green-600 text-4xl mt-3" />,
    },
    {
        title: "நம்ம ஊர் சந்தை",
        details: "கோவை.",
        icon1: <FaLeaf className="text-green-600 text-4xl mb-3" />,
        icon2: <FaSeedling className="text-green-600 text-4xl mt-3" />,
    },
    {
        title: "குறிஞ்சி இயற்கை அங்காடி",
        details: "ஊத்துக்குளி, திருப்பூர்.",
        icon1: <FaLeaf className="text-green-600 text-4xl mb-3" />,
        icon2: <FaSeedling className="text-green-600 text-4xl mt-3" />,
    },
    {
        title: "நற்றினை இயற்கை அங்காடி",
        details: "சரவணம்பட்டி, கோவை.",
        icon1: <FaLeaf className="text-green-600 text-4xl mb-3" />,
        icon2: <FaSeedling className="text-green-600 text-4xl mt-3" />,
    },
    {
        title: "வையகம் இயற்கை அங்காடி",
        details: "இராமநாதபுரம், கோவை.",
        icon1: <FaLeaf className="text-green-600 text-4xl mb-3" />,
        icon2: <FaSeedling className="text-green-600 text-4xl mt-3" />,
    },
    {
        title: "உயிர் ஆர்கானிக்ஸ்",
        details: "கோவை.",
        icon1: <FaLeaf className="text-green-600 text-4xl mb-3" />,
        icon2: <FaSeedling className="text-green-600 text-4xl mt-3" />,
    },
    {
        title: "திரு. குமரகுரு",
        details: "கோத்தகிரி - Sigma Organics Farmers Market (கோவைக்கு நேரடி வழங்கல் உண்டு).",
        icon1: <FaLeaf className="text-green-600 text-4xl mb-3" />,
        icon2: <FaSeedling className="text-green-600 text-4xl mt-3" />,
    },
    {
        title: "யோகேஷ்வர் காய்கறி வைத்தியர்",
        details: (
            <>
                <p>
                    Uppilipalayam, Coimbatore - 15<br />
                    <a
                        href="https://www.vegetableclinic.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline"
                    >
                        www.vegetableclinic.com
                    </a>
                </p>
            </>
        ),
        icons: {
            icon1: <FaLeaf className="text-green-600 text-4xl mb-3" />,
            icon2: <FaSeedling className="text-green-600 text-4xl mt-3" />,
        },
    },
];

// ReferenceCard Component
const ReferenceCard = ({ title, details }) => (
    <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
        <div className="flex items-center mb-3">
            <FaLeaf className="text-green-600 text-4xl mr-2" />
            <FaSeedling className="text-green-600 text-4xl" />
        </div>
        <h3 className="text-lg font-semibold text-green-700">{title}</h3>
        <p className="text-gray-700 mt-2">{details}</p>
    </div>
);

const References = () => {
    const [showMore, setShowMore] = useState(false);
    const displayedReferences = showMore ? references : references.slice(0, 0); // Show 6 references initially

    return (
        <div
            className="bg-gray-100 py-10 border border-green-500"
            style={{
                backgroundImage: `url(${green})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
            aria-label="Background with greenish tones"
        >
            <div className="text-center mb-8">
                <h2
                    className="text-2xl font-semibold text-green-800"
                    role="heading"
                    aria-level="2"
                >
                    சிறந்த இயற்கை விவசாயம் மற்றும் இன்றைய பெருமை பெற்ற இடங்கள்
                </h2>
                <p className="mt-4 text-xl text-black font-bold">
                    எங்கள் ஈடு இணையில்லா அர்ப்ணிப்புகளும், சமர்ப்பணங்களும் ... நன்றியுடன் ... உரித்ததாகுக!
                </p>
            </div>

            {/* Top References Section */}
            <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4">
                {topReferences.map((ref, index) => (
                    <ReferenceCard key={index} title={ref.title} details={ref.details} />
                ))}
            </div>

            {/* Additional References Section */}
            <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 px-4 mt-10">
                {displayedReferences.map((ref, index) => (
                    <ReferenceCard key={index} title={ref.title} details={ref.details} />
                ))}
            </div>

            {/* Show More Button */}
            <div className="text-center mt-8">
                <button
                    onClick={() => setShowMore(!showMore)}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                >
                    {showMore ? "Show Less" : "Show More"}
                </button>
            </div>
        </div>
    );
};

export default References;
