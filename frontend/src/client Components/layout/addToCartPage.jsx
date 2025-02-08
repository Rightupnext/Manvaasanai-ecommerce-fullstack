import React, { useEffect, useState } from "react";
import { removeFromCart } from "../../store/reducers/CartReducers";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CheckOutModel from "./CheckOutModel";
import { getShippingAndTax } from "../../store/reducers/shippingAndTaxSlice";

function AddToCartPage() {
  const dispatch = useDispatch();
  const { shippingAndTax } = useSelector((state) => state.shippingAndTax);
  const cartItems = useSelector((state) => state.cart.cartItems);
  
  const [localItems, setLocalItems] = useState(cartItems);
  const [quantities, setQuantities] = useState({});
  const [openModal, setOpenModal] = useState(false);

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
    const totalAmount = subTotal + taxAmount ;

    return { subTotal, taxAmount, totalAmount };
  };

  const { subTotal, taxAmount, totalAmount ,taxRate} = calculateTotal();

  const handleOpenModal = () => setOpenModal(!openModal);
  const handleCloseModal = () => setOpenModal(false);

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
                              className="flex items-center justify-center w-5 h-5 bg-blue-600 outline-none rounded-full"
                            >
                              -
                            </button>
                            <span className="font-bold text-sm">{quantities[product._id] || 1}</span>
                            <button
                              onClick={() => handleQuantityIncrease(product._id)}
                              type="button"
                              className="flex items-center justify-center w-5 h-5 bg-blue-600 outline-none rounded-full"
                            >
                              +
                            </button>
                          </div>
                          <div className="flex items-center">
                            <h4 className="text-lg font-bold text-gray-800">${product.discountprice}</h4>
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
                  Subtotal <span className="ml-auto font-bold">${subTotal.toFixed(2)}</span>
                </li>
                <li className="flex flex-wrap gap-4 py-3">
                  Tax <span className="ml-auto font-bold">{tax.toFixed(2)} %</span>
                </li>
                <li className="flex flex-wrap gap-4 py-3 font-bold">
                  Total <span className="ml-auto">${totalAmount.toFixed(2)}</span>
                </li>
              </ul>
              <button onClick={handleOpenModal} className="mt-4 w-full bg-blue-600 text-white rounded-md p-2">
                Make Payment
              </button>
            </div>
          </div>
        </div>
      </div>
      {openModal && <CheckOutModel handleCloseModal={handleCloseModal}  totalAmount={totalAmount}/>}
    </>
  );
}

export default AddToCartPage;
