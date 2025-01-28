import React, { useState } from 'react';
import { FaStar, FaWhatsapp } from "react-icons/fa";
import menu1 from '../../images/assets/image6.jpg';
import menu2 from '../../images/assets/ell-urundai1.png';
import menu3 from '../../images/assets/image4.png';
import menu4 from '../../images/assets/image5.png';
import menu5 from '../../images/assets/mixture.png';
import menu6 from '../../images/assets/snacks3.png';
import menu7 from '../../images/assets/image3.png';
import menu8 from '../../images/assets/burfi.png';

function Menu() {
    const [filter, setFilter] = useState('all');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    const menuData = [
        {
            id: 1,
            heading: "தேங்காய் லட்டு",
            price: "$10",
            subtitle: "பனங்கருப்பட்டி + நாட்டு சர்க்கரை",
            img: menu3,
            category: "Sweets",
            detail: "இந்த தேங்காய் லட்டு பாரம்பரிய முறையில் தயாரிக்கப்பட்டது. இதில் நாட்டு சர்க்கரை பயன்படுத்தியதால், இயற்கையான இனிப்பு சுவை கிடைக்கிறது. அடிகலனின் சுவையோடு கொத்துமைத் தேங்காய் சேர்த்து, இதயத்திற்கு ஆரோக்கியமான இந்த லட்டு நம் முன்னோர்களின் சுவையைக் கொண்டதாகும்.",
            nutrition: [
                {
                    nutrient: "Energy",
                    value100g: "1989 Kcal",
                    valueServing: "497 Kcal",
                    dvPercent: "0%"
                },
                {
                    nutrient: "Carbohydrate",
                    value100g: "44 g",
                    valueServing: "11 g",
                    dvPercent: "3.6%"
                },
                {
                    nutrient: "Protein",
                    value100g: "4.72 g",
                    valueServing: "1.18 g",
                    dvPercent: "2.3%"
                },
                {
                    nutrient: "Fat",
                    value100g: "33 g",
                    valueServing: "8.25 g",
                    dvPercent: "12.69%"
                },
                {
                    nutrient: "Fibre",
                    value100g: "7.23 g",
                    valueServing: "1.80 g",
                    dvPercent: "7.2%"
                },
                {
                    nutrient: "Calcium",
                    value100g: "72.7 mg",
                    valueServing: "18.17 mg",
                    dvPercent: "1.3%"
                },
                {
                    nutrient: "Iron",
                    value100g: "3.04 mg",
                    valueServing: "0.76 mg",
                    dvPercent: "4.2%"
                }
            ]

        },
        {
            id: 2,
            heading: "எள் உருண்டை",
            price: "$10",
            subtitle: "பனங்கருப்பட்டி + உரலில் இடித்தது",
            img: menu2,
            category: "Sweets",
            detail: "இந்த எள் உருண்டை, இயற்கையான பனங்கருப்பட்டி மற்றும் உரலில் இடித்த எள்ளை பயன்படுத்தி தயாரிக்கப்பட்டது. இதில் உள்ள எள் சத்துக்கள் உடலின் நோய் எதிர்ப்புத் திறனை மேம்படுத்த உதவுகின்றன. பாரம்பரிய முறையில் சுவையான மற்றும் ஆரோக்கியமான இக்காரிய உருண்டை, உங்கள் உடல் ஆரோக்கியத்திற்கு சிறந்த தேர்வாகும்.",
            nutrition: [
                {
                    nutrient: "Energy",
                    value100g: "2095 Kcal",
                    valueServing: "523 Kcal",
                    dvPercent: "0%"
                },
                {
                    nutrient: "Carbohydrate",
                    value100g: "50.3 g",
                    valueServing: "12.5 g",
                    dvPercent: "4.1%"
                },
                {
                    nutrient: "Protein",
                    value100g: "13.95 g",
                    valueServing: "3.4 g",
                    dvPercent: "6.8%"
                },
                {
                    nutrient: "Fat",
                    value100g: "26.67 g",
                    valueServing: "6.6 g",
                    dvPercent: "10.1%"
                },
                {
                    nutrient: "Fibre",
                    value100g: "2.14 g",
                    valueServing: "0.7 g",
                    dvPercent: "2%"
                },
                {
                    nutrient: "Calcium",
                    value100g: "785 mg",
                    valueServing: "196 mg",
                    dvPercent: "15.07%"
                },
                {
                    nutrient: "Iron",
                    value100g: "9 mg",
                    valueServing: "2.2 mg",
                    dvPercent: "12.2%"
                }
            ]
        },
        {
            id: 3,
            heading: "நிலக்கடலை உருண்டை",
            price: "$10",
            subtitle: "பனங்கருப்பட்டி + உரலில் இடித்தது",
            img: menu4,
            category: "Sweets",
            detail: "இந்த நிலக்கடலை உருண்டை பனங்கருப்பட்டியைப் பயன்படுத்தி பாரம்பரிய முறையில் தயாரிக்கப்பட்டது. இதில் உள்ள நிலக்கடலை கொழுப்பு, புரதச் சத்து மற்றும் நார்ச்சத்து நிறைந்தது. இந்த இனிப்பு சிறு இடைவெளி உணவாகப் பயன்படுத்தக் கூடியதும், உடலுக்கு தாராளமான சத்துகளை வழங்குவதாலும் ஆரோக்கியமான தேர்வாகும்.",
            nutrition: [
                {
                    nutrient: "Energy",
                    value100g: "1828 Kcal",
                    valueServing: "457 Kcal"
                },
                {
                    nutrient: "Carbohydrate",
                    value100g: "50.7 g",
                    valueServing: "12.67 g",
                    dvPercent: "4.2%"
                },
                {
                    nutrient: "Protein",
                    value100g: "12.74 g",
                    valueServing: "3.1 g",
                    dvPercent: "6.2%"
                },
                {
                    nutrient: "Fat",
                    value100g: "19.8 g",
                    valueServing: "4.95 g",
                    dvPercent: "7.6%"
                },
                {
                    nutrient: "Fibre",
                    value100g: "5.19 g",
                    valueServing: "1.2 g",
                    dvPercent: "4.8%"
                },
                {
                    nutrient: "Calcium",
                    value100g: "80.5 mg",
                    valueServing: "20.1 mg",
                    dvPercent: "1.5%"
                },
                {
                    nutrient: "Iron",
                    value100g: "4.03 mg",
                    valueServing: "1 mg",
                    dvPercent: "5.5%"
                }
            ]
        },
        { id: 4, heading: "சிறுதானிய லட்டு", price: "$10", subtitle: "பனங்கருப்பட்டி + ஆர்கானிக் சர்க்கரை", img: menu1, category: "Sweets", detail: "இந்த சிறுதானிய லட்டு நாட்டு சர்க்கரையைப் பயன்படுத்தி ஆரோக்கியமான முறையில் தயாரிக்கப்பட்டது. இதில் குதிரைவாலி, தினை, சாமை போன்ற சிறுதானியங்கள் சேர்க்கப்பட்டு, மிகுந்த சத்துமிக்கதாகவும், நார்ச்சத்து நிறைந்ததாகவும் உள்ளது. பாரம்பரிய முறையில் உள்ள இந்நறுமண லட்டு, சத்துணவாகும், மேலும் இது நீண்ட நேரத்துக்கு பசிக்குடிப்பை தடை செய்கிறது." },
        { id: 5, heading: "ரவா லட்டு", price: "$10", subtitle: "ஆர்கானிக் சர்க்கரை", img: menu7, category: "Sweets", detail: "இந்த ரவா லட்டு நாட்டு சர்க்கரையை வைத்து சுவையாகவும், ஆரோக்கியமாகவும் தயாரிக்கப்பட்டது. மொத்த ரவா, நெய், மற்றும் நாட்டு சக்கரையின் இனிப்பால் பரிமாறப்படும் இந்த லட்டு, மிருதுவாகவும் இனிய சுவையுடனும் அமைந்துள்ளது. பாரம்பரிய நம்பிக்கைகளுக்கு ஏற்ப, இந்த இனிப்பு சிறியவர்களும் பெரியவர்களும் விரும்பும் தன்மையுடையது." },
        { id: 6, heading: "சிறுதானிய / பாரம்பரிய அரிசி மிக்சர்", price: "$10", subtitle: "செக்கு தேங்காய் எண்ணெய்/ செக்கு கடலை எண்ணெய்", img: menu5, category: "Snacks", detail: "இந்த சிறுதானிய மிக்சர் பாரம்பரிய முறைப்படி குதிரைவாலி, தினை, சாமை போன்ற சிறுதானியங்களால் தயாரிக்கப்பட்டது. இதில் உள்ள ஒவ்வொரு தானியமும் உடலுக்கு சத்துக்களை வழங்குவதோடு, இந்த மிக்சர் நார்ச்சத்து, கனிமச்சத்து ஆகியவற்றில் வளமையாகவும் உள்ளது. நேர்த்தியான காய்கலை முறை மற்றும் கிராமிய சுவையோடு இந்த மிக்சர் குடும்பம் முழுவதற்கும் ஆரோக்கியமான இடைவேளி சிற்றுண்டியாக பயன்படும்." },
        {
            id: 7, heading: "பாரம்பரிய அரிசி ரிப்பன் முறுக்கு", price: "$10", subtitle: "பாரம்பரிய அரிசி + செக்கு தேங்காய் எண்ணெய்/ செக்கு கடலை எண்ணெய்", img: menu6, category: "Snacks", detail: "இந்த சிறுதானிய ரிப்பன் பக்கோடா, சுவையான தேங்காய் சேர்க்கப்பட்டு பாரம்பரிய முறையில் தயாரிக்கப்பட்டது.குதிரைவாலி, தினை, சாமை போன்ற சிறுதானியங்களின் தனிச்சுவையுடன் தேங்காயின் இனிய மணமும் சேர்ந்து, இந்த பக்கோடாவை சுவையான மற்றும் சத்தான இடைவேளி சிற்றுண்டியாக ஆக்குகிறது.இது உங்கள் உடலுக்கு ஆரோக்கியம் தரும் சுவையான நொறுக்குத்தீனியாகும்."
        },
        { id: 8, heading: "தேங்காய் பர்பி", price: "$10", subtitle: "ஆர்கானிக் சர்க்கரை", img: menu8, category: "sweets", detail: "இந்த தேங்காய் பர்பி, இனிமையான தேங்காயுடன் பாரம்பரிய முறையில் தயாரிக்கப்பட்டது. தேங்காயின் சிறந்த சுவை மற்றும் நன்னெடிய மணம், இந்த பர்பியை மிகவும் சுவையான மற்றும் சத்தான சிற்றுண்டியாக மாற்றுகிறது. இது உங்கள் உடலுக்கு ஆரோக்கியம் தரும் சுவையான மற்றும் ஊட்டச்சத்து நிறைந்த இனிப்பு பரிமாற்றமாகும்." },
    ];

    const filteredMenuData = filter === 'all' ? menuData : menuData.filter(item => item.category === filter);

    const openModal = (item) => {
        setSelectedItem(item);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedItem(null);
    };

    return (
        <section className="bg-gray-200 py-12" id="our-menu">
            <div className="container mx-auto px-4">
                <div className="text-center mb-8">
                    <h2 className="text-4xl font-bold text-gray-800 text-green-500">Menu</h2>
                    <p className="mt-2 text-lg text-gray-700">Explore Our Best Menu</p>
                </div>

                <div className="flex justify-center space-x-4 mb-10">
                    <button
                        className={`px-4 py-2 border rounded ${filter === 'all' ? 'bg-green-500 text-white' : 'bg-white text-green-500 border-green-500'}`}
                        onClick={() => setFilter('all')}
                    >
                        All
                    </button>
                    <button
                        className={`px-4 py-2 border rounded ${filter === 'Sweets' ? 'bg-green-500 text-white' : 'bg-white text-green-500 border-green-500'}`}
                        onClick={() => setFilter('Sweets')}
                    >
                        இனிப்புகள்
                    </button>
                    <button
                        className={`px-4 py-2 border rounded ${filter === 'Snacks' ? 'bg-green-500 text-white' : 'bg-white text-green-500 border-green-500'}`}
                        onClick={() => setFilter('Snacks')}
                    >
                        காரம்
                    </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredMenuData.map((item) => (
                        <div
                            key={item.id}
                            className="bg-white shadow-lg items-center rounded-lg p-6 flex flex-col"
                            onClick={() => openModal(item)}
                        >
                            <img
                                src={item.img}
                                alt="img"
                                className="w-64 h-64 object-cover items-center text-center rounded-full mb-4"
                                data-aos="fade-down"
                            />
                            <div className="flex-1 text-center"> {/* Allow text section to grow */}
                                <h3 className="text-xl font-semibold text-gray-800">{item.heading}</h3>
                                <h6 className="text-gray-600 mt-2"><strong>குறிப்பு : </strong>{item.subtitle}</h6>
                                <div className="flex justify-center mt-4">
                                    {[...Array(4)].map((_, index) => (
                                        <FaStar key={index} className="text-green-400 mx-1" />
                                    ))}
                                </div>
                            </div>

                            <div className="mt-4 flex justify-center space-x-4"> {/* Remove bottom fixed positioning */}
                                <button
                                    className="px-6 py-2 bg-green-500 text-white rounded-full"
                                    onClick={closeModal}
                                >
                                    View
                                </button>
                                <a
                                    href="https://wa.me/+918870566255"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center px-6 py-2 bg-green-500 text-white rounded-full"
                                >
                                    <FaWhatsapp size={20} className="mr-2" />
                                    Order Now
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>


            {/* Modal */}
            {isModalOpen && selectedItem && (
                <div
                    className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50 p-4 sm:p-8"
                    onClick={closeModal}
                >
                    <div
                        className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full md:max-w-2xl lg:max-w-4xl h-[90vh] overflow-y-auto sm:p-8 relative"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close Button */}
                        <button
                            className="absolute top-4 right-4 text-2xl text-gray-800 hover:text-red-500 focus:outline-none"
                            onClick={closeModal}
                        >
                            &times; {/* You can replace this with an asterisk or another symbol */}
                        </button>

                        <img
                            src={selectedItem.img}
                            alt={selectedItem.heading}
                            className="w-full sm:w-80 h-48 sm:h-72 object-cover rounded-lg mb-4 mx-auto"
                        />
                        <h2 className="text-2xl font-bold text-center text-gray-800">{selectedItem.heading}</h2>
                        {/* <p className="text-xl font-bold text-center text-gray-800 mt-2">{selectedItem.price}</p> */}
                        <p className="text-md text-gray-600 mt-4 leading-relaxed">{selectedItem.detail}</p>
                        <div className="mt-6 flex justify-center space-x-4">
                            <button
                                className="px-4 sm:px-6 py-2 bg-green-500 text-white rounded-full"
                                onClick={closeModal}
                            >
                                Close
                            </button>
                            <a
                                href="https://wa.me/+918870566255"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center px-4 sm:px-6 py-2 bg-green-500 text-white rounded-full"
                            >
                                <FaWhatsapp size={20} className="mr-2" />
                                Contact
                            </a>
                        </div>
                        {/* Nutritional Table */}
                        {selectedItem.nutrition && (
                            <div className="mt-6">
                                <h3 className="text-2xl font-semibold text-gray-800 text-center mb-4">Nutritional Information</h3>
                                <p className="text-md text-gray-600 mb-4 text-center">
                                    Nutritive Value of {selectedItem.heading} (Per serving - 25gm)
                                </p>
                                <div className="overflow-x-auto">
                                    <table className="min-w-full table-auto border-separate border-spacing-0 rounded-lg shadow-md bg-white">
                                        <thead className="bg-green-500 text-white">
                                            <tr>
                                                <th className="px-6 py-4 text-left text-sm font-medium text-gray-100">Nutrient</th>
                                                <th className="px-6 py-4 text-left text-sm font-medium text-gray-100">Value per 100g</th>
                                                <th className="px-6 py-4 text-left text-sm font-medium text-gray-100">Value per Serving (25g)</th>
                                                <th className="px-6 py-4 text-left text-sm font-medium text-gray-100">Dv Percent (25g)</th>
                                            </tr>
                                        </thead>
                                        <tbody className="text-sm text-gray-700">
                                            {selectedItem.nutrition.map((item, index) => (
                                                <tr key={index} className="hover:bg-gray-100 transition-colors">
                                                    <td className="px-6 py-4 border-b border-gray-200">{item.nutrient}</td>
                                                    <td className="px-6 py-4 border-b border-gray-200">{item.value100g}</td>
                                                    <td className="px-6 py-4 border-b border-gray-200">{item.valueServing}</td>
                                                    <td className="px-6 py-4 border-b border-gray-200">{item.dvPercent}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                <p className="text-bold text-gray-600 mt-4">
                                    *Percent Daily Values are based on a 2000-kilocalorie diet. Your daily values may be higher or lower depending on your daily needs. The % daily value (DV) indicates how much a nutrient in a serving of food contributes to a daily diet of 2000 calories.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            )}


        </section>
    );
}

export default Menu;