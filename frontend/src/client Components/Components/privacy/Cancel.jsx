import React from 'react'
import Footer from '../Footer'

const Cancel = () => {
  return (
   <>
   <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg my-10">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
        Cancellation, Return, and Refund Policy
      </h1>

      <section className="mb-6">
        <h2 className="text-xl font-semibold text-gray-700">
          1. Order Cancellations
        </h2>
        <ul className="list-disc pl-5 text-gray-600 mt-2">
          <li>Customers can cancel an order <strong>within 1 hour</strong> of placing it.</li>
          <li>If preparation has started, cancellations will not be accepted.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold text-gray-700">2. Return Policy</h2>
        <p className="text-gray-600 mt-2">
          Due to the perishable nature of our food products, <strong>returns are not allowed</strong>,
          except in cases of:
        </p>
        <ul className="list-disc pl-5 text-gray-600 mt-2">
          <li>Receiving an incorrect item.</li>
          <li>Spoiled or damaged food at the time of delivery.</li>
        </ul>
        <p className="text-gray-600 mt-2">
          - Customers must initiate the return request <strong>within 1 day</strong> of receiving the order.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold text-gray-700">3. Refund Policy</h2>
        <ul className="list-disc pl-5 text-gray-600 mt-2">
          <li>Refunds are applicable only for valid return cases mentioned above.</li>
          <li>Customers must provide clear images or video proof of the issue.</li>
          <li>Approved refunds will be processed within <strong>1-2 business days</strong> and credited to the original payment method within <strong>5-7 business days</strong>.</li>
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

export default Cancel