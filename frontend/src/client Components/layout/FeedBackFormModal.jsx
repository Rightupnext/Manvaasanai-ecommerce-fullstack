import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import axiosInstance from "../../store/axios";
export default function FeedBackForm({ setReviewShow, handlecloseModal }) {
  const { title } = useParams();
  const [formData, setFormData] = useState({
    testimonial: "",
    rating: 4,
    satisfaction: 5,
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosInstance.post("/api/products/reviews", {
        productId: title,
        comment: formData.testimonial,
        rating: formData.rating,
      });


        setReviewShow("");
        setFormData({ testimonial: "", rating: 0 });
        handlecloseModal();
      
    } catch (error) {
      console.error("Error submitting feedback:", error);
    }
  };

  return (
    <div className="fixed inset-0 p-4 flex flex-wrap justify-center items-center w-full h-full z-[1000] before:fixed before:inset-0 before:w-full before:h-full before:bg-[rgba(0,0,0,0.5)] overflow-auto font-[sans-serif]">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-6 relative">
        <div className="flex items-center pb-3 border-b border-gray-300">
          <h3 className="text-gray-800 text-xl font-bold flex-1 text-center">
            Write your Reviews
          </h3>
          <svg
            onClick={handlecloseModal}
            xmlns="http://www.w3.org/2000/svg"
            className="w-3 ml-2 cursor-pointer shrink-0 fill-gray-400 hover:fill-red-500"
            viewBox="0 0 320.591 320.591"
          >
            <path
              d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z"
              data-original="#000000"
            />
            <path
              d="M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 0 1-23.078 7.288z"
              data-original="#000000"
            />
          </svg>
        </div>
        <div className="my-6">
          <form className="max-w-md mx-auto mt-16 p-4shadow rounded">
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
                      className={`shrink-0 size-6 fill-current ${formData.rating >= star ? "text-yellow-400" : "text-gray-300"}`}
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
          </form>
        </div>
        <div className="border-t border-gray-300 pt-6 flex justify-end gap-4">
          <button
            onClick={handlecloseModal}
            type="button"
            className="px-4 py-2 rounded-lg text-gray-800 text-sm border-none outline-none tracking-wide bg-gray-200 hover:bg-gray-300 active:bg-gray-200"
          >
            Close
          </button>
          <button
            onClick={handleSubmit}
            type="button"
            className="px-4 py-2 rounded-lg text-white text-sm border-none outline-none tracking-wide bg-blue-600 hover:bg-blue-700 active:bg-blue-600"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
