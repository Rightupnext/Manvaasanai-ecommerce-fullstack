import React, { useState } from "react";

export default function FeedBackForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    testimonial: "",
    rating: 4,
    date: new Date().toISOString().split("T")[0],
    satisfaction: 5,
    recommend: true,
    consent: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : type === "radio"
          ? Number(value)
          : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Data:", formData);
    alert("Form submitted successfully!");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto mt-16 p-4 bg-white shadow rounded"
    >
      <h2 className="text-2xl font-bold mb-4 text-center">
        Write your Reviews
      </h2>

      <div className="mb-4">
        <label htmlFor="name" className="block mb-1">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full py-2 px-4 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="email" className="block mb-1">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full py-2 px-4 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="testimonial" className="block mb-1">
          Message
        </label>
        <textarea
          id="testimonial"
          name="testimonial"
          value={formData.testimonial}
          onChange={handleChange}
          className="w-full py-2 px-4 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1">Rating</label>
        <div className="flex flex-row-reverse justify-end items-center">
          {[5, 4, 3, 2, 1].map((star) => (
            <label key={star} className="cursor-pointer">
              <input
                type="radio"
                name="rating"
                value={star}
                checked={formData.rating === star}
                onChange={handleChange}
                className="hidden peer"
              />
              <svg
                className={`shrink-0 size-6 fill-current ${
                  formData.rating >= star ? "text-yellow-400" : "text-gray-300"
                }`}
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
              >
                <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
              </svg>
            </label>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <label className="flex items-center">
          <input
            type="checkbox"
            name="consent"
            checked={formData.consent}
            onChange={handleChange}
            className="mr-2"
          />
          I consent to my feedback being published
        </label>
      </div>

      <button
        type="submit"
        className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Submit
      </button>
    </form>
  );
}
