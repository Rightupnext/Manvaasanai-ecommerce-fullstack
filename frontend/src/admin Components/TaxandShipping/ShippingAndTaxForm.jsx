import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createShippingAndTax } from "../../store/reducers/shippingAndTaxSlice";

function ShippingAndTaxForm() {
  const dispatch = useDispatch();
  const [tax, setTax] = useState("");
  const [shippingAmount, setShippingAmount] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (parseFloat(tax) < 0 || parseFloat(shippingAmount) < 0) {
      setError("Tax and Shipping Charge cannot be negative.");
      return;
    }

    setError("");

    dispatch(createShippingAndTax({ tax, ShippingAmount: shippingAmount }));
  };

  return (
    <form
      className="space-y-6 px-4 max-w-sm mx-auto font-[sans-serif]"
      onSubmit={handleSubmit}
    >
      <div className="flex items-center">
        <label className="text-gray-400 w-36 text-sm">Tax %</label>
        <input
          name="tax"
          type="number"
          value={tax}
          onChange={(e) => setTax(e.target.value)}
          placeholder="Example 2 %"
          className="px-2 py-2 w-full border-b-2 focus:border-[#333] outline-none text-sm bg-white"
        />
      </div>
      <div className="flex items-center">
        <label className="text-gray-400 w-36 text-sm">Shipping Charge</label>
        <input
          name="ShippingAmount"
          type="number"
          value={shippingAmount}
          onChange={(e) => setShippingAmount(e.target.value)}
          placeholder="Enter shipping amount"
          className="px-2 py-2 w-full border-b-2 focus:border-[#333] outline-none text-sm bg-white"
        />
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <button
        type="submit"
        className="!mt-8 px-6 py-2 w-full bg-[#333] hover:bg-[#444] text-sm text-white mx-auto block"
      >
        Submit
      </button>
    </form>
  );
}

export default ShippingAndTaxForm;
