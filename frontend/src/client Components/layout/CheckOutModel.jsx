import React, { useState, useEffect } from "react";
import Payment from "./Payment";
import AddressForm from "./AddressForm";
import OrderConfirmSuccessMessage from "./OrderConfirmSuccessMessage";
import { myOrders } from "../../store/reducers/userReducers";
import { useDispatch } from "react-redux";

function CheckOutModel({ handleCloseModal, totalAmount, quantities }) {
  const dispatch=useDispatch()
  const [currentStep, setCurrentStep] = useState(0);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [shippingAddress, setShippingAddress] = useState({
    fullName: "",
    street: "",
    city: "",
    state: "",
    phoneNumber: "",
    postalCode: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setShippingAddress({
      ...shippingAddress,
      [name]: value,
    });
  };

  const isAddressValid = Object.values(shippingAddress).every((field) => field.trim() !== "");

  const handlePaymentSuccess = () => {
    setPaymentSuccess(true);
    setCurrentStep(2); 
  };

  const steps = [
    {
      title: "Personal Info",
      content: (
        <AddressForm
          shippingAddress={shippingAddress}
          setShippingAddress={setShippingAddress}
          handleChange={handleChange}
        />
      ),
    },
    {
      title: "Payment",
      content: <Payment totalAmount={totalAmount} quantities={quantities} onSuccess={handlePaymentSuccess} setCurrentStep={setCurrentStep} />,
    },
    { title: "Order Completed", content: <OrderConfirmSuccessMessage /> },
  ];

  const handleNextStep = () => {
    if (currentStep === 0) {
      localStorage.setItem("manvaasanai_Shipping_Address", JSON.stringify(shippingAddress));
    }
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  useEffect(() => {
    if (currentStep === 2) {
      const timer = setTimeout(() => {
        handleCloseModal();
        dispatch(myOrders())
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [currentStep, handleCloseModal]);

  return (
    <div className="fixed inset-0 p-4 flex flex-wrap justify-center items-center w-full z-[50] before:fixed before:inset-0 before:w-full before:h-full before:bg-[rgba(0,0,0,0.5)] overflow-auto font-[sans-serif]">

      <div className="w-full max-w-4xl bg-white shadow-lg rounded-3xl p-6 relative">
        <svg
          onClick={handleCloseModal}
          xmlns="http://www.w3.org/2000/svg"
          className="w-3.5 cursor-pointer shrink-0 fill-gray-400 hover:fill-red-500 float-right"
          viewBox="0 0 320.591 320.591"
        >
          <path d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z" />
          <path d="M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 0 1-23.078 7.288z" />
        </svg>

        <div className="flex items-start max-w-screen-lg mx-auto">
          {steps.map((step, index) => (
            <div key={index} className="w-full">
              <div className="flex items-center w-full">
                <div
                  className={`w-7 h-7 shrink-0 mx-[-1px] ${
                    currentStep === index ? "bg-blue-600" : "bg-gray-300"
                  } flex items-center justify-center rounded-full`}
                >
                  <span className="text-sm text-white font-bold">{index + 1}</span>
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-full h-[3px] mx-4 rounded-lg ${currentStep >= index ? "bg-blue-600" : "bg-gray-300"}`} />
                )}
              </div>
              <div className="mt-2 mr-4">
                <h6 className="text-sm font-bold text-blue-500">{step.title}</h6>
                <p className="text-xs text-gray-500">
                  {currentStep > index ? "Completed" : currentStep === index ? "In Progress" : "Pending"}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4">
          <div>{steps[currentStep].content}</div>

          <div className="flex justify-between mt-4">
            <button
              onClick={() => setCurrentStep((prev) => Math.max(prev - 1, 0))}
              disabled={currentStep === 0 || paymentSuccess} // Disable if payment is successful
              className={`px-4 py-2 rounded-lg ${currentStep === 0 || paymentSuccess ? "bg-gray-300 text-gray-600" : "bg-gray-600 text-white"}`}
            >
              Previous
            </button>

            <button
              onClick={handleNextStep}
              disabled={currentStep === steps.length - 1 || (currentStep === 0 && !isAddressValid)}
              className={`px-4 py-2 rounded-lg ${currentStep === steps.length - 1 || (currentStep === 0 && !isAddressValid) ? "bg-gray-300 text-gray-600" : "bg-blue-600 text-white"}`}
            >
              {currentStep === steps.length - 1 ? "Close" : "Next"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckOutModel;
