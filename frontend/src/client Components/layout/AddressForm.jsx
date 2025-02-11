import React from "react";

function AddressForm({ shippingAddress, setShippingAddress, handleChange }) {
  return (
    <>
      <form className="font-[sans-serif] text-[#333] max-w-4xl mx-auto px-6 my-6">
        <div className="grid sm:grid-cols-2 gap-10">
          <div className="relative flex flex-col">
            <label className="text-[13px] absolute top-0 left-0 translate-y-[-50%] bg-white px-1">
              First Name
            </label>
            <input
              name="fullName"
              value={shippingAddress.fullName}
              onChange={handleChange}
              type="text"
              placeholder="Enter first name"
              className="px-2 pt-3 pb-2 bg-white w-full text-sm border-b-2 border-gray-100 focus:border-[#333] outline-none"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="#bbb"
              stroke="#bbb"
              className="w-[18px] h-[18px] absolute right-2 top-1/2 translate-y-[-50%]"
              viewBox="0 0 24 24"
            >
              <circle cx={10} cy={7} r={6} />
              <path d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z" />
            </svg>
          </div>

          <div className="relative flex flex-col">
            <label className="text-[13px] absolute top-0 left-0 translate-y-[-50%] bg-white px-1">
              Phone Number
            </label>
            <input
              name="phoneNumber"
              value={shippingAddress.phoneNumber}
              onChange={handleChange}
              type="number"
              placeholder="Enter phone no."
              className="px-2 pt-3 pb-2 bg-white w-full text-sm border-b-2 border-gray-100 focus:border-[#333] outline-none"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="#bbb"
              stroke="#bbb"
              className="w-[18px] h-[18px] absolute right-2 top-1/2 translate-y-[-50%]"
              viewBox="0 0 24 24"
            >
              <circle cx={10} cy={7} r={6} />
              <path d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z" />
            </svg>
          </div>

          <div className="relative flex flex-col">
            <label className="text-[13px] absolute top-0 left-0 translate-y-[-50%] bg-white px-1">
              street
            </label>
            <input
              name="street"
              value={shippingAddress.street}
              onChange={handleChange}
              type="text"
              placeholder="Enter street"
              className="px-2 pt-3 pb-2 bg-white w-full text-sm border-b-2 border-gray-100 focus:border-[#333] outline-none"
            />
            <svg
              fill="#bbb"
              className="w-[18px] h-[18px] absolute right-2 top-1/2 translate-y-[-50%]"
              viewBox="0 0 64 64"
            >
              <path d="m52.148 42.678-6.479-4.527a5 5 0 0 0-6.963 1.238l-1.504 2.156c-2.52-1.69-5.333-4.05-8.014-6.732-2.68-2.68-5.04-5.493-6.73-8.013l2.154-1.504a4.96 4.96 0 0 0 2.064-3.225 4.98 4.98 0 0 0-.826-3.739l-4.525-6.478C20.378 10.5 18.85 9.69 17.24 9.69a4.69 4.69 0 0 0-1.628.291 8.97 8.97 0 0 0-1.685.828l-.895.63a6.782 6.782 0 0 0-.63.563c-1.092 1.09-1.866 2.472-2.303 4.104-1.865 6.99 2.754 17.561 11.495 26.301 7.34 7.34 16.157 11.9 23.011 11.9 1.175 0 2.281-.136 3.29-.406 1.633-.436 3.014-1.21 4.105-2.302.199-.199.388-.407.591-.67l.63-.899a9.007 9.007 0 0 0 .798-1.64c.763-2.06-.007-4.41-1.871-5.713z" />
            </svg>
          </div>

          <div className="relative flex flex-col">
            <label className="text-[13px] absolute top-0 left-0 translate-y-[-50%] bg-white px-1">
              City
            </label>
            <input
              name="city"
              value={shippingAddress.city}
              onChange={handleChange}
              type="text"
              placeholder="Enter city"
              className="px-2 pt-3 pb-2 bg-white w-full text-sm border-b-2 border-gray-100 focus:border-[#333] outline-none"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="#bbb"
              className="w-[18px] h-[18px] absolute right-2 top-1/2 translate-y-[-50%]"
              viewBox="0 0 24 24"
            >
              <path d="M20.48 8.301A9.217 9.217 0 0 1 21.25 12c0 5.105-4.145 9.25-9.25 9.25S2.75 17.105 2.75 12 6.895 2.75 12 2.75a.75.75 0 0 0 0-1.5C6.067 1.25 1.25 6.067 1.25 12S6.067 22.75 12 22.75 22.75 17.933 22.75 12c0-1.529-.32-2.983-.896-4.301a.75.75 0 0 0-1.374.602z" />
              <path d="M17 1.25a3.443 3.443 0 0 0-3.442 3.442c0 .594.269 1.317.685 2.023.835 1.421 2.227 2.815 2.227 2.815a.749.749 0 0 0 1.06 0s1.392-1.394 2.227-2.815c.416-.706.685-1.429.685-2.023 0-1.9-1.542-3.442-3.442-3.442zm0 1.5c1.072 0 1.942.87 1.942 1.942 0 .528-.393 1.177-.815 1.789A15.328 15.328 0 0 1 17 7.901c-.325-.366-.75-.874-1.127-1.42-.422-.612-.815-1.261-.815-1.789 0-1.072.87-1.942 1.942-1.942z" />
            </svg>
          </div>

          {/* Email Field */}
          <div className="relative flex flex-col">
            <label className="text-[13px] absolute top-0 left-0 translate-y-[-50%] bg-white px-1">
              State
            </label>
            <input
              name="state"
              type="text"
              value={shippingAddress.state}
              onChange={handleChange}
              placeholder="Enter state"
              className="px-2 pt-3 pb-2 bg-white w-full text-sm border-b-2 border-gray-100 focus:border-[#333] outline-none"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="#bbb"
              stroke="#bbb"
              className="w-[18px] h-[18px] absolute right-2 top-1/2 translate-y-[-50%]"
              viewBox="0 0 682.667 682.667"
            >
              <g transform="matrix(1.33 0 0 -1.33 0 682.667)">
                <path
                  fill="none"
                  strokeMiterlimit={10}
                  strokeWidth={40}
                  d="M452 444H60c-22.091 0-40-17.909-40-40v-39.446l212.127-157.782c14.17-10.54 33.576-10.54 47.746 0L492 364.554V404c0 22.091-17.909 40-40 40Z"
                />
                <path d="M472 274.9V107.999c0-11.027-8.972-20-20-20H60c-11.028 0-20 8.973-20 20V274.9L0 304.652V107.999c0-33.084 26.916-60 60-60h392c33.084 0 60 26.916 60 60v196.653Z" />
              </g>
            </svg>
          </div>

          {/* Password Field */}
          <div className="relative flex flex-col">
            <label className="text-[13px] absolute top-0 left-0 translate-y-[-50%] bg-white px-1">
              postalCode
            </label>
            <input
              name="postalCode"
              value={shippingAddress.postalCode}
              onChange={handleChange}
              type="number"
              placeholder="Enter postalCode"
              className="px-2 pt-3 pb-2 bg-white w-full text-sm border-b-2 border-gray-100 focus:border-[#333] outline-none"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="#bbb"
              stroke="#bbb"
              className="w-[18px] h-[18px] absolute right-2 top-1/2 translate-y-[-50%] cursor-pointer"
              viewBox="0 0 128 128"
            >
              <path d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z" />
            </svg>
          </div>
        </div>
      </form>
    </>
  );
}

export default AddressForm;
