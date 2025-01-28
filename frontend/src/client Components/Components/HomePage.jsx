import { FaAppleAlt, FaHeart, FaArrowUp } from "react-icons/fa";
import poster from "../../images/assets/poster.jpg";
import background from "../../images/assets/bg1.jpg";
import nammalvar from "../../images/assets/nammalvar.jpg";
import poster1 from "../../images/assets/rava laddu.jpg";

const About1 = () => {
  return (
  <div>
      <h1 className="text-center text-3xl md:text-4xl text-green-500 font-bold mt-10 ">
          உலகின் முதல் உணவு விஞ்ஞானி{" "}
          <span className="text-green-700">{"“"}அம்மா{"”"}</span>
        </h1>
      <section
        className="min-h-screen relative flex items-center overflow-hidden bg-cover bg-center w-full"
        style={{ backgroundImage: `url(${background})` }}
      >
        {/* Top Icons and Text Row */}
        <div
          className="absolute  top-2 ml-[10%] space-x-8 mt-6 md:mt-0 md:ml-0 md:top-8  md:left-1/2 md:transform md:-translate-x-[10%] flex lg:space-x-28 md:space-y-0 md:space-x-3 lg:space-y-0 lg:-translate-x-10  item-center"
        >
          {[
            {
              icon: (
                <FaAppleAlt className="text-red-400 w-3 mr-2 md:w-full animate-pulse" />
              ),
              text: "உணவு!",
            },
            {
              icon: (
                <FaHeart className="text-red-400 w-3 mr-2 md:w-full animate-bounce" />
              ),
              text: "உணர்வு!!",
            },
            {
              icon: (
                <FaArrowUp className="text-green-400 mr-2 w-3 md:w-full animate-pulse" />
              ),
              text: "உயர்வு!!!",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="flex items-center   mr-2 md:h-20   md:p-3 px-1 py-1  md:rounded-xl  rounded-md transition-opacity shadow-md backdrop-blur-lg"
            >
              {item.icon}
              <h4 className="text-[14px] md:text-sm lg:text-2xl font-semibold md:text-gray-800 text-white">
                {item.text}
              </h4>
            </div>
          ))}
        </div>
  
        {/* Main Content */}
        <div className="container mx-auto flex flex-col-reverse lg:flex-row items-center mt-10 md:mt-0 justify-between px-4 py-10">
          {/* Image Grid Section */}
          <div className="w-full lg:w-[70%] mb-8 lg:mb-0 lg:-translate-x-10">
            <div
              className="flex flex-wrap items-center justify-center"
              
            >
              {/* Reduced size for the first two images */}
              <div className="w-[40%] sm:w-1/2 hidden md:block p-3 lg:translate-x-28" data-aos="fade-right">
                <img
                  src={nammalvar}
                  alt="Image 1"
                  className="w-[60%] lg:translate-x-10 rounded-2xl"
                />
                <img
                  src={poster1}
                  alt="Image 2"
                  className="w-[60%] lg:translate-x-10 mt-4 rounded-2xl"
                />
              </div>
  
              {/* Increased size for the third image */}
              <div
                className="w-full h-full sm:w-1/2 p-3"  
              >
                <img
                  src={poster}
                  alt="Poster"
                  className="w-full h-full rounded-2xl object-cover"
                />
              </div>
            </div>
          </div>
  
          {/* Text Content Section as Card */}
          <div
            className="w-full lg:w-6/12 p-6 bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg relative"
            data-aos="fade-up"
          >
            <span className="block mb-4 text-3xl font-semibold text-green-600">
              கோவை மண்வாசனை இயற்கை உணவகம்
            </span>
            
          </div>
        </div>
      </section>
  </div>
  );
};

export default About1;
