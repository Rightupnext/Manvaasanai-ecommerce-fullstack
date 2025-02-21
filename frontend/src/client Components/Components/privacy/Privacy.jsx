import React from 'react'
import Footer from '../Footer'

const Privacy = () => {
  return (
   <>
   <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg my-10">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
        Privacy Policy
      </h1>

      <section className="mb-6">
        <h2 className="text-xl font-semibold text-gray-700">1. Introduction</h2>
        <p className="text-gray-600 mt-2">
          At <strong>Kovai Mannvaasanai Iyarkkai Unavagam</strong>, we prioritize your privacy and ensure that your personal data is handled securely. This policy outlines how we collect, use, and protect your information.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold text-gray-700">
          2. Information We Collect
        </h2>
        <ul className="list-disc pl-5 text-gray-600 mt-2">
          <li>
            <strong>Personal Information:</strong> Name, contact number, email address, and delivery address for order fulfillment.
          </li>
          <li>
            <strong>Payment Information:</strong> Payment details processed securely via third-party payment gateways (we do not store your card details).
          </li>
          <li>
            <strong>Browsing Data:</strong> Information about your visit, including IP address, browser type, and preferences, for website improvement.
          </li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold text-gray-700">
          3. How We Use Your Information
        </h2>
        <ul className="list-disc pl-5 text-gray-600 mt-2">
          <li>To process and deliver orders efficiently.</li>
          <li>To send order updates, promotions, and personalized recommendations (only with consent).</li>
          <li>To improve website performance and enhance user experience.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold text-gray-700">4. Data Security</h2>
        <p className="text-gray-600 mt-2">
          - We use industry-standard encryption and security protocols to protect your personal data.
          <br />- Despite our best efforts, no online platform is 100% secure. Users must take precautions when sharing personal details online.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold text-gray-700">
          5. Third-Party Disclosure
        </h2>
        <p className="text-gray-600 mt-2">
          - We do not sell, trade, or share personal data with third parties, except for essential services like payment processing and delivery.
          <br />- We may disclose information if required by law or to protect our business interests.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold text-gray-700">
          6. Cookies & Tracking Technologies
        </h2>
        <p className="text-gray-600 mt-2">
          - We use cookies to enhance user experience, analyze site traffic, and remember preferences.
          <br />- Users can manage or disable cookies through their browser settings.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold text-gray-700">
          7. Changes to the Privacy Policy
        </h2>
        <p className="text-gray-600 mt-2">
          - We may update this policy periodically. Users are encouraged to review it frequently.
        </p>
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

export default Privacy