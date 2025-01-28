import React from 'react';
import about from '../../images/assets/About_1.png';

function AboutUs() {
  return (
    <section className="bg-02 px-6" id="about-us">
      <div className="shape-02" />
      <div className="shape-03" />
      <div className="shape-04" />
      <div className="container py-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center justify-center">
          {/* Image Section */}
          <div className="flex justify-center mb-4 md:mb-0">
            <div className="wrapper">
              <div className="image" data-aos="fade-left">
                <img src={about} alt="About Us" className="img-fluid w-full" />
              </div>
            </div>
          </div>

          {/* Text Content Section */}
          <div className="text-center md:text-left">
            <div className="content">
              <span className="text-green-500 block text-4xl font-bold mb-5 text-center" >
                About
              </span>
              <h2 className="mb-4 text-green-500 text-2xl font-semibold text-center">
                Food Is an Important Part of a Balanced Diet
              </h2>
              <p className="mb-4 text-[16px] text-center">
                Discover the Essence of Tamil Food Culture. In a world of fast food and modern diets, we invite you to explore the rich tapestry of Tamil cuisine—a heritage that spans centuries. Our mission: To revive forgotten flavors, celebrate local ingredients, and honor the wisdom of our ancestors.
              </p>
              <h4 className="mb-3 text-green-500 text-2xl text-center font-semibold">Health and Harmony:</h4>
              <p className="text-lg text-[16px] text-center">
                Tamil food isn’t just about taste; it’s about holistic well-being. Explore dishes that balance flavors, boost immunity, and connect mind, body, and soul.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutUs;
