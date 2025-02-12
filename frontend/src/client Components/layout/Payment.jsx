import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { createOrder, verifyPayment } from "../../store/reducers/razorpaySlice";
import { placeOrder } from "../../store/reducers/orderslice";

const Payment = ({ totalAmount, quantities,setCurrentStep }) => {
  const dispatch = useDispatch();
  const { order, loading } = useSelector((state) => state.razorpay);
  const cartItems = JSON.parse(localStorage.getItem("cartItems"));

  const products = cartItems.map((item, index) => {
    const quantity = quantities[index] || 1;  
    console.log("product:", item._id, "quantity:", quantity);

    return {
      product: item._id,
      quantity: quantity,  
    };
  });


  
  const loadRazorpay = async () => {
    const shippingAddress = JSON.parse(localStorage.getItem("manvaasanai_Shipping_Address"));
    try {

      const action = await dispatch(createOrder(totalAmount));
      if (action.meta.requestStatus === "fulfilled") {
        const { id, amount, } = action.payload;

        const options = {
          key: "rzp_test_8hV47x6HKSO9Zq",
          amount,
          currency: "INR",
          name: "Kovaimanvaasanai",
          description: "Test Transaction",
          order_id: id,
          handler: async (response) => {

            const verifyAction = await dispatch(verifyPayment(response));
            if (verifyAction.payload.status === "success") {
             
              await dispatch(placeOrder({
                products: products,
                amount: totalAmount,
                shippingAddress,
                paymentId: response.razorpay_payment_id,
              })).then((res) => res.json())
                .then((data) => {
                  if (data.message === "Order placed successfully") {
                    localStorage.removeItem("cartItems");
                    setCurrentStep(2)
                  }
                })
                .catch((error) => console.error("Error saving order:", error));
            } else {
              alert("Payment verification failed!");
            }
          },
        
          theme: { color: "#3399cc" },
        };


        const razor = new window.Razorpay(options);
        razor.open();
      }
    } catch (error) {
      console.error("Error in creating order:", error);
    }
  };

  return (
    <div className="flex justify-center">
    <button
      onClick={loadRazorpay}
      disabled={loading}
      type="button"
      className="text-gray-900 justify-center bg-[#F7BE38] hover:bg-[#F7BE38]/90 focus:ring-4 focus:outline-none focus:ring-[#F7BE38]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#F7BE38]/50 me-2 mb-2"
    >
      <svg
        className="w-4 h-4 me-2 -ms-1"
        aria-hidden="true"
        focusable="false"
        data-prefix="fab"
        data-icon="paypal"
        role="img"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 384 512"
      >
        <path
          fill="currentColor"
          d="M111.4 295.9c-3.5 19.2-17.4 108.7-21.5 134-.3 1.8-1 2.5-3 2.5H12.3c-7.6 0-13.1-6.6-12.1-13.9L58.8 46.6c1.5-9.6 10.1-16.9 20-16.9 152.3 0 165.1-3.7 204 11.4 60.1 23.3 65.6 79.5 44 140.3-21.5 62.6-72.5 89.5-140.1 90.3-43.4 .7-69.5-7-75.3 24.2zM357.1 152c-1.8-1.3-2.5-1.8-3 1.3-2 11.4-5.1 22.5-8.8 33.6-39.9 113.8-150.5 103.9-204.5 103.9-6.1 0-10.1 3.3-10.9 9.4-22.6 140.4-27.1 169.7-27.1 169.7-1 7.1 3.5 12.9 10.6 12.9h63.5c8.6 0 15.7-6.3 17.4-14.9 .7-5.4-1.1 6.1 14.4-91.3 4.6-22 14.3-19.7 29.3-19.7 71 0 126.4-28.8 142.9-112.3 6.5-34.8 4.6-71.4-23.8-92.6z"
        />
      </svg>
      {loading ? "Processing..." : `Pay Now ${totalAmount}`}
    </button>
  </div>
  
  );
};

export default Payment;
