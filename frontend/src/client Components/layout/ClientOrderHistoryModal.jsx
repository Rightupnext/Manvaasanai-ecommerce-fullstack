import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../../store/reducers/productReducers";

function ClientOrderHistoryModal({ handleCloseModal, data }) {
  const dispatch = useDispatch();
  const { product, loading, error } = useSelector((state) => state.products);

  // Triggering a product fetch for each product ID inside the modal
  useEffect(() => {
    if (data.length > 0) {
      data.forEach((order) => {
        data.products.forEach((productItem) => {
          // Dispatching product fetch for each product ID
          dispatch(getProduct(productItem.product?._id));
        });
      });
    }
  }, [dispatch, data]);
  console.log("pop", data);
  const getImageURL = (filename) =>
    `http://localhost:5000/api/products/images/${filename}`;

  return (
    <>
      <div className="fixed inset-0 p-4 flex flex-wrap justify-center items-center w-full h-full z-[1000] before:fixed before:inset-0 before:w-full before:h-full before:bg-[rgba(0,0,0,0.5)] overflow-auto font-[sans-serif]">
        <div className="w-full max-w-[70%] bg-white shadow-lg rounded-lg p-6 relative overflow-y-scroll">
          <div className="flex items-center pb-3 border-b border-gray-300">
            <h3 className="text-gray-800 text-xl font-bold flex-1">
              # My Order Details
            </h3>
            <svg
              onClick={handleCloseModal}
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
          <div className="my-6 ">
            <div>
              <div>
                <h1>Shipping Adress</h1>
                <p>
                  <strong>Full Name:</strong> {data?.shippingAddress?.fullName}
                </p>
                <p>
                  <strong>Phone Number:</strong>{" "}
                  {data?.shippingAddress?.phoneNumber}
                </p>
                <p>
                  <strong>Order Status:</strong> {data.status}
                </p>
                <p>
                  <strong>City:</strong> {data?.shippingAddress?.city}
                </p>
              </div>
              <div className="border p-4 rounded-lg mb-4">
                <div className="flex justify-evenly items-center mb-3">
                  <div>
                    <p className="text-gray-500">Order number</p>
                    <p className="font-semibold">#{data._id}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Payment Id</p>
                    <p className="font-semibold">#{data.
paymentId
}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Order Date</p>
                    <p className="font-semibold">
                      {new Date(data.createdAt).toLocaleString("en-GB", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "numeric",
                        minute: "numeric",
                        second: "numeric",
                        hour12: true,
                      })}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500">Total amount</p>
                    <p className="font-semibold">${data.amount}</p>
                  </div>

                  <p
                    className={`me-2 mt-1.5 inline-flex items-center rounded px-2.5 py-0.5 text-xs font-medium
    ${
      data.paymentType === "cash"
        ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
        : ""
    }
    ${
      data.paymentType === "online"
        ? "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
        : ""
    }
  `}
                  >
                    {data?.paymentType}
                  </p>

                  <div></div>
                </div>
                {/* Order Items */}
                <div className="border-t pt-3 over">
                  {data?.products.map((product) => (
                    <div
                      className="flex items-center gap-4 mb-3"
                      key={product.product._id}
                    >
                      {product?.product?.image
                        ?.slice(0, 1)
                        .map((filename, index) => (
                          <img
                            src={getImageURL(filename)}
                            alt="Product"
                            className="w-12 h-12 rounded-md"
                            key={index}
                          />
                        ))}
                      <div className="flex-1">
                        <p className="font-medium">{product?.product?.title}</p>
                        <p className="text-gray-500 text-sm">
                          Price :{product?.product?.discountprice}
                        </p>
                        <p className="text-gray-500 text-sm">
                          Net Weight: {product?.product?.packSize}
                        </p>
                        <p className="text-gray-500 text-sm">
                          Quantity: {product?.quantity}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-300 pt-6 flex justify-end gap-4">
            <button
              onClick={handleCloseModal}
              type="button"
              className="px-4 py-2 rounded-lg text-gray-800 text-sm border-none outline-none tracking-wide bg-gray-200 hover:bg-gray-300 active:bg-gray-200"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ClientOrderHistoryModal;
