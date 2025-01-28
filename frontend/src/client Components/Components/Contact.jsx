import React from 'react';

function Contact() {
  return (
    <section id="contact" className="py-16 bg-white p-10 rounded-xl shadow-xl">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800">Contact Us</h2>
          <p className="text-lg text-gray-600 mt-4">We would love to hear from you! Drop us a message below.</p>
        </div>
        <div className="lg:flex lg:justify-between gap-10">
          {/* Form Section */}
          <div className="w-full lg:w-1/2 mb-8 lg:mb-0">
            <form>
              <div className="mb-6">
                <input
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Your Name"
                  required
                  name="name"
                  aria-label="Your Name"
                />
              </div>
              <div className="mb-6">
                <input
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Your Email"
                  required
                  type="email"
                  name="email"
                  aria-label="Your Email"
                />
              </div>
              <div className="mb-6">
                <input
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Your Phone"
                  required
                  type="tel"
                  name="phone"
                  aria-label="Your Phone"
                />
              </div>
              <div className="mb-6">
                <textarea
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Your Message"
                  rows="6"
                  name="message"
                  aria-label="Your Message"
                />
              </div>
              <div className="mb-6">
                <button
                  type="submit"
                  className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-300"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>

          {/* Map Section */}
          <div className="w-full lg:w-1/2">
            <div className="relative" style={{ paddingBottom: '56.25%', height: 0, overflow: 'hidden' }}>
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                frameBorder="0"
                scrolling="no"
                marginHeight="0"
                marginWidth="0"
                src="https://maps.google.com/maps?width=600&height=400&hl=en&q=கோவை%20மண்வாசனை%20இயற்கை%20உணவகம்%2014/29%20-%201%2C%20Selvarajapuram%2C%20Pappampatti%20Pirivu%20Post%2C%20Chinthamanipudur%2C%20Coimbatore%2C%20Tamil%20Nadu%20641103&t=&z=16&ie=UTF8&iwloc=B&output=embed"
                title="Google Map"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
