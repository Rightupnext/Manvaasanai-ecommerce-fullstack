import React from 'react';
import home3 from "../../images/assets/mixture.png";
import home2 from '../../images/assets/ell-urundai1.png';

const posts = [
  {
    image: home2,
    title: "கருப்பட்டி எள்ளு உருண்டை",
    description: "எள்ளின் நலம், கருப்பட்டியின் இனிப்பு பாசம்<br/> உருண்டை ஒன்றில் உலகு ஆரோக்கிய முத்தாச்சாரம்!"
  },
  {
    image: home3,
    title: "பாரம்பரிய மிக்சர்",
    description: "நாகரிகக் கலவையில் சுவை, <br/>உணவின் பண்டிகையில் மகிழ்ச்சி."
  },
];

const Swipe = () => {
  return (
    <div className="flex items-center justify-center h-auto bg-white py-10">
      <div className="max-w-screen-lg mx-auto px-4 sm:px-8 md:px-10 lg:px-20">
        {/* <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Our Famous Foods</h1>
        </div> */}
        <div className="space-y-8">
          {posts.map((post, index) => (
            <div
              key={index}
              className={`bg-white shadow-lg rounded-3xl overflow-hidden hover:shadow-xl transition-shadow duration-300 ease-in-out ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              } flex flex-col md:flex`}
            >
              {/* Image Section */}
              <div className="w-full md:w-1/3 flex justify-center items-center px-4 py-6 md:px-5" data-aos="fade-right">
                <img className="w-48 h-56 sm:w-64 object-cover rounded-lg" src={post.image} alt={post.title} />
              </div>

              {/* Text Section */}
              <div className="w-full md:w-2/3 px-6 py-4 md:px-8 flex flex-col justify-center text-center" data-aos="fade-left">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">{post.title}</h2>
                <p
                  className="text-gray-600 text-sm sm:text-base"
                  dangerouslySetInnerHTML={{ __html: post.description }}
                ></p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Swipe;
