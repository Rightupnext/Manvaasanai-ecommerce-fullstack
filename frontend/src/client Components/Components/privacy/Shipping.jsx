import React from 'react'
import Footer from '../Footer'

const Shipping = () => {
  return (
   <>
   <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg my-10">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
        Shipping & Delivery Policy
      </h1>

      <section className="mb-6">
        <h2 className="text-xl font-semibold text-gray-700">
          1. Delivery Areas
        </h2>
        <p className="text-gray-600 mt-2">
          We currently deliver within <strong>Coimbatore and selected nearby locations</strong>.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold text-gray-700">
          2. Delivery Time
        </h2>
        <ul className="list-disc pl-5 text-gray-600 mt-2">
          <li>Orders are delivered within <strong>1 to 5 days</strong>, depending on the customer's location.</li>
          <li>Customers will receive tracking updates via email/SMS.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold text-gray-700">
          3. Delivery Charges
        </h2>
        <p className="text-gray-600 mt-2">
          Delivery charges are applicable based on the distance and will be displayed at checkout.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold text-gray-700">
          4. Pickup Option
        </h2>
        <p className="text-gray-600 mt-2">
          Customers can opt for <strong>self-pickup</strong> from our location:
        </p>
        <p className="text-gray-700 font-medium mt-2">
          14/29-2, Selvarajapuram, Pappampattiprivu, Behind Prasanthi Weigh Bridge, <br />
          Next to Food in 641 Hotel, Chinthamanipudur Post, Irugur Via, <br />
          Coimbatore - 641103
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold text-gray-700">
          5. Shipping Delays
        </h2>
        <ul className="list-disc pl-5 text-gray-600 mt-2">
          <li>While we strive for timely delivery, delays may occur due to traffic, weather conditions, or unforeseen circumstances.</li>
          <li>In case of significant delays, our team will notify the customer.</li>
        </ul>
      </section>

      <section className="mb-6 text-center">
        <h2 className="text-xl font-semibold text-gray-700">Contact Us</h2>
        <p className="text-gray-600 mt-2">
          📧 <a href="mailto:kovaimannvaasanai@gmail.com" className="text-blue-500">kovaimannvaasanai@gmail.com</a>
          <br />
          📞 <a href="tel:+918870566255" className="text-blue-500">+91 88705 66255</a>
        </p>
      </section>
    </div>
    <Footer/>
   </>

  )
}

export default Shipping