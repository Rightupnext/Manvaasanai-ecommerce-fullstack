import React from 'react'
import Footer from '../Footer'

const Terms = () => {
  return (
    <div>
     <>
    
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg my-10">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
        Terms and Conditions
      </h1>

      <section className="mb-6">
        <h2 className="text-xl font-semibold text-gray-700">1. Introduction</h2>
        <p className="text-gray-600 mt-2">
          Welcome to <strong>Kovai Mannvaasanai Iyarkkai Unavagam</strong>. By accessing and using our website{" "}
          <a href="https://kovaimannvaasanai.com/" className="text-blue-500" target="_blank" rel="noopener noreferrer">
            kovaimannvaasanai.com
          </a>
          , you agree to abide by these terms and conditions. Please read them carefully before using our services.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold text-gray-700">2. Eligibility</h2>
        <ul className="list-disc pl-5 text-gray-600 mt-2">
          <li>Users must be <strong>18 years or older</strong> or have parental consent to place an order.</li>
          <li>By placing an order, you confirm that the details provided are accurate and complete.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold text-gray-700">3. Use of the Website</h2>
        <ul className="list-disc pl-5 text-gray-600 mt-2">
          <li>The website is intended for personal use to explore and order traditional Tamil cuisine.</li>
          <li>Unauthorized access, scraping of content, or using the website for fraudulent purposes is prohibited.</li>
          <li>We reserve the right to restrict access or suspend services if any misuse is detected.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold text-gray-700">4. Product Information & Availability</h2>
        <ul className="list-disc pl-5 text-gray-600 mt-2">
          <li>We take great care in preparing our food items, ensuring authenticity and quality.</li>
          <li>Due to seasonal variations and ingredient availability, some dishes may be temporarily unavailable.</li>
          <li>The images displayed on our website are for reference only; actual products may differ slightly.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold text-gray-700">5. Ordering & Payment</h2>
        <ul className="list-disc pl-5 text-gray-600 mt-2">
          <li>Orders must be placed through our official website or other designated platforms.</li>
          <li>Payment must be made in full before order confirmation.</li>
          <li>We accept various payment methods, including credit/debit cards, UPI, and digital wallets.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold text-gray-700">6. Cancellations & Modifications</h2>
        <ul className="list-disc pl-5 text-gray-600 mt-2">
          <li>Orders can be canceled <strong>within 1 hour</strong> of placing the order.</li>
          <li>Once food preparation begins, cancellations are not permitted.</li>
          <li>Modifications to an order are allowed within the same timeframe, subject to feasibility.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold text-gray-700">7. Limitation of Liability</h2>
        <ul className="list-disc pl-5 text-gray-600 mt-2">
          <li>We are not liable for any adverse reactions due to food allergies. Customers are advised to check ingredient details before ordering.</li>
          <li>Any delivery delays due to unforeseen circumstances such as traffic, weather, or technical issues are beyond our control.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold text-gray-700">8. Intellectual Property</h2>
        <p className="text-gray-600 mt-2">
          All website content, including text, images, and recipes, is the intellectual property of <strong>Kovai Mannvaasanai Iyarkkai Unavagam</strong> and cannot be reproduced without permission.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold text-gray-700">9. Changes to Terms</h2>
        <p className="text-gray-600 mt-2">
          We reserve the right to update these terms at any time. Continued use of our services after modifications constitutes acceptance of the new terms.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold text-gray-700">10. Governing Law & Dispute Resolution</h2>
        <p className="text-gray-600 mt-2">
          These terms are governed by the laws of India. Any disputes shall be resolved under the jurisdiction of <strong>Coimbatore, Tamil Nadu</strong>.
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
      
    </div>
  )
}

export default Terms