import React, { useEffect, useState } from "react";
import { removeFromCart } from "../../store/reducers/CartReducers";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CheckOutModel from "./CheckOutModel";
import { getShippingAndTax } from "../../store/reducers/shippingAndTaxSlice";
import ClientOrderHistory from './ClientOrderHistory'
function AddToCartPage() {
  const dispatch = useDispatch();
  const { shippingAndTax } = useSelector((state) => state.shippingAndTax);
  const cartItems = useSelector((state) => state.cart.cartItems);

  const [localItems, setLocalItems] = useState(cartItems);
  const [quantities, setQuantities] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const { loading } = useSelector((state) => state.shippingAndTax);

  useEffect(() => {
    dispatch(getShippingAndTax());
  }, [dispatch]);

  useEffect(() => {
    setLocalItems(cartItems);
  }, [cartItems]);

  const handleQuantityIncrease = (productId) => {
    setQuantities((prev) => ({
      ...prev,
      [productId]: (prev[productId] || 1) + 1,
    }));
  };

  const handleQuantityDecrease = (productId) => {
    setQuantities((prev) => ({
      ...prev,
      [productId]: Math.max(1, (prev[productId] || 1) - 1),
    }));
  };

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  const getImageURL = (filename) =>
    filename ? `http://localhost:5000/api/products/images/${filename}` : "";

  const tax = shippingAndTax?.shippingAndTax?.[0]?.tax || 0;
  const calculateTotal = () => {
    const taxRate = shippingAndTax?.shippingAndTax?.[0]?.tax || 0;
    const shippingAmount = shippingAndTax?.shippingAndTax?.[0]?.ShippingAmount || 0;

    let subTotal = 0;
    localItems.forEach((product) => {
      const quantity = quantities[product._id] || 1;
      subTotal += product.discountprice * quantity;
    });

    const taxAmount = (taxRate / 100) * subTotal;
    const totalAmount = Math.round(subTotal + taxAmount );

    return { subTotal, taxAmount, totalAmount };
  };

  const { subTotal, taxAmount, totalAmount ,taxRate} = calculateTotal();

  const handleOpenModal = () => setOpenModal(!openModal);
  const handleCloseModal = () => setOpenModal(false);

  if (loading) return (
    <div className="flex justify-center items-center h-screen">
      <svg className="w-16 h-16 animate-spin text-gray-900/50" viewBox="0 0 64 64" fill="none"
        xmlns="http://www.w3.org/2000/svg" width="24" height="24">
        <path
          d="M32 3C35.8083 3 39.5794 3.75011 43.0978 5.20749C46.6163 6.66488 49.8132 8.80101 52.5061 11.4939C55.199 14.1868 57.3351 17.3837 58.7925 20.9022C60.2499 24.4206 61 28.1917 61 32C61 35.8083 60.2499 39.5794 58.7925 43.0978C57.3351 46.6163 55.199 49.8132 52.5061 52.5061C49.8132 55.199 46.6163 57.3351 43.0978 58.7925C39.5794 60.2499 35.8083 61 32 61C28.1917 61 24.4206 60.2499 20.9022 58.7925C17.3837 57.3351 14.1868 55.199 11.4939 52.5061C8.801 49.8132 6.66487 46.6163 5.20749 43.0978C3.7501 39.5794 3 35.8083 3 32C3 28.1917 3.75011 24.4206 5.2075 20.9022C6.66489 17.3837 8.80101 14.1868 11.4939 11.4939C14.1868 8.80099 17.3838 6.66487 20.9022 5.20749C24.4206 3.7501 28.1917 3 32 3L32 3Z"
          stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"></path>
        <path
          d="M32 3C36.5778 3 41.0906 4.08374 45.1692 6.16256C49.2477 8.24138 52.7762 11.2562 55.466 14.9605C58.1558 18.6647 59.9304 22.9531 60.6448 27.4748C61.3591 31.9965 60.9928 36.6232 59.5759 40.9762"
          stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" className="text-gray-900">
        </path>
      </svg>
    </div>
  );
  
  return (
    <>
      <div className="font-[sans-serif] bg-gradient-to-tr from-gray-200 via-gray-100 to-gray-50">
        <div className="max-w-7xl max-lg:max-w-4xl mx-auto p-6">
          <h2 className="text-2xl font-bold text-gray-800">Your shopping cart</h2>
          <div className="grid lg:grid-cols-3 gap-4 relative mt-8">
            <div className="lg:col-span-2 space-y-4">
              {localItems.length === 0 ? (
                <h1>Your cart is empty</h1>
              ) : (
                localItems.map((product) => (
                  <div key={product._id} className="p-6 bg-white shadow-md rounded-md relative">
                    <div className="flex items-center max-sm:flex-col gap-4">
                      <div className="w-52 h-52 shrink-0">
                        <img
                          src={getImageURL(product?.image?.[0])}
                          className="w-full h-full object-contain"
                          alt={product.title}
                        />
                      </div>
                      <div className="sm:border-l sm:pl-4 sm:border-gray-300 w-full">
                        <Link to={`/products/${product._id}`}>
                          <h3 className="text-lg font-bold text-gray-800">{product.title}</h3>
                        </Link>
                        <ul className="mt-4 text-sm text-gray-500 space-y-2">
                          <li>NetWt: {product.packSize}</li>
                        </ul>
                        <hr className="border-gray-300 my-4" />
                        <div className="flex items-center justify-between flex-wrap gap-4">
                          <div className="flex items-center gap-3">
                            <h4 className="text-sm font-bold text-gray-800">Qty:</h4>
                            <button
                              onClick={() => handleQuantityDecrease(product._id)}
                              type="button"
                              className="flex items-center justify-center w-5 h-5 bg-[#34bd71] outline-none rounded-full"
                            >
                              -
                            </button>
                            <span className="font-bold text-sm">{quantities[product._id] || 1}</span>
                            <button
                              onClick={() => handleQuantityIncrease(product._id)}
                              type="button"
                              className="flex items-center justify-center w-5 h-5 bg-[#34bd71] outline-none rounded-full"
                            >
                              +
                            </button>
                          </div>
                          <div className="flex items-center">
                            <h4 className="text-lg font-bold text-gray-800">₹{product.discountprice}</h4>
                            <svg
                              onClick={() => handleRemove(product._id)}
                              xmlns="http://www.w3.org/2000/svg"
                              className="w-3 cursor-pointer shrink-0 fill-gray-400 hover:fill-red-500 absolute top-3.5 right-3.5"
                              viewBox="0 0 320.591 320.591"
                            >
                              <path d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z" />
                              <path d="M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 0 1-23.078 7.288z" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
            <div className="bg-white h-max rounded-md p-6 shadow-md sticky top-0">
              <h3 className="text-lg font-bold text-gray-800">Order Summary</h3>
              <ul className="text-gray-800 text-sm divide-y mt-4">
                <li className="flex flex-wrap gap-4 py-3">
                  Subtotal <span className="ml-auto font-bold">₹{subTotal.toFixed(2)}</span>
                </li>
                <li className="flex flex-wrap gap-4 py-3">
                  Tax <span className="ml-auto font-bold">{tax.toFixed(2)} %</span>
                </li>
                <li className="flex flex-wrap gap-4 py-3 font-bold">
                  Total <span className="ml-auto">₹{totalAmount.toFixed(2)}</span>
                </li>
              </ul>
              <button onClick={handleOpenModal} className="mt-4 w-full bg-[#34bd71] text-white rounded-md p-2">
                Make Payment
              </button>
            </div>
          </div>
        </div>
      </div>
      {openModal && <CheckOutModel handleCloseModal={handleCloseModal}  totalAmount={totalAmount} quantities={quantities}/>}
      <ClientOrderHistory/>
    </>
  );
}

export default AddToCartPage;