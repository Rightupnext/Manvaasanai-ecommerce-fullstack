import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../../store/reducers/productReducers";
import {
  FaBox,
  FaShippingFast,
  FaCheckCircle,
  FaClock,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaCreditCard,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const ClientOrderHistoryModal = ({ handleCloseModal, data }) => {
  const [currentStatus, setCurrentStatus] = useState(data?.status);
  const [showDetails, setShowDetails] = useState(null);
  const dispatch = useDispatch();
  const { product, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    if (data.length > 0) {
      data.forEach((order) => {
        data.products.forEach((productItem) => {
          dispatch(getProduct(productItem.product?._id));
        });
      });
    }
  }, [dispatch, data]);
  const formatDate = (date) => {
    if (!date) return "-"; // Return "-" if no date is available
    const d = new Date(date);
    const year = d.getFullYear().toString().slice(-2); // Get last 2 digits of the year
    const month = (d.getMonth() + 1).toString().padStart(2, "0"); // Add leading zero if needed
    const day = d.getDate().toString().padStart(2, "0");
    const hours = d.getHours().toString().padStart(2, "0");
    const minutes = d.getMinutes().toString().padStart(2, "0");
    const seconds = d.getSeconds().toString().padStart(2, "0");

    return `${year}-${month}-${day} - ${hours}:${minutes}:${seconds}`;
  };

  const pendingStatusTime = formatDate(
    data?.statusHistory?.[data?.statusHistory?.length - 1]?.updatedAt
  );
  const PackedStatusTime = formatDate(
    data?.statusHistory?.[data?.statusHistory?.length - 2]?.updatedAt
  );
  const ShippedStatusTime = formatDate(
    data?.statusHistory?.[data?.statusHistory?.length - 3]?.updatedAt
  );
  const DeliveredStatusTime = formatDate(
    data?.statusHistory?.[data?.statusHistory?.length - 4]?.updatedAt
  );

  const getImageURL = (filename) =>
    `${import.meta.env.VITE_BACKEND_URL}/api/products/images/${filename}`;

  const orderStatuses = [
    {
      id: 1,
      status: "Pending",
      label: "Order Pending",
      icon: <FaClock className="w-6 h-6" />,
      date: pendingStatusTime,
      description: "Your order has been received and is being processed.",
    },
    {
      id: 2,
      status: "Packed",
      label: "Order Packed",
      icon: <FaBox className="w-6 h-6" />,
      date: PackedStatusTime,
      description: "Your order has been packed and is ready for shipping.",
    },
    {
      id: 3,
      status: "Shipped",
      label: "Order Shipped",
      icon: <FaShippingFast className="w-6 h-6" />,
      date: ShippedStatusTime,
      description: "Your order is on its way to you.",
    },
    {
      id: 4,
      status: "Delivered",
      label: "Order Delivered",
      icon: <FaCheckCircle className="w-6 h-6" />,
      date: DeliveredStatusTime,
      description: "Your order has been delivered successfully.",
    },
  ];

  const getStatusColor = (status, itemStatus) => {
    if (getStatusIndex(currentStatus) >= getStatusIndex(itemStatus)) {
      switch (status) {
        case "Pending":
          return "text-yellow-500 bg-yellow-100";
        case "Packed":
          return "text-blue-400 bg-blue-100";
        case "Shipped":
          return "text-blue-600 bg-blue-100";
        case "Delivered":
          return "text-green-500 bg-green-100";
        default:
          return "text-gray-400 bg-gray-100";
      }
    }
    return "text-gray-400 bg-gray-100";
  };

  const getStatusIndex = (status) => {
    return orderStatuses.findIndex((item) => item.status === status);
  };

  const getProgressWidth = () => {
    const currentIndex = getStatusIndex(currentStatus);
    return `${(currentIndex / (orderStatuses.length - 1)) * 100}%`;
  };

  return (
    <div className="fixed inset-0 p-4 flex flex-wrap justify-center items-center w-full h-full z-[1000] before:fixed before:inset-0 before:w-full before:h-full before:bg-[rgba(0,0,0,0.5)] overflow-auto font-[sans-serif]">
      <div className="w-full lg:max-w-[70%] bg-white shadow-lg rounded-lg p-6 relative overflow-y-scroll">
        <svg
          onClick={handleCloseModal}
          xmlns="http://www.w3.org/2000/svg"
          className="w-4 ml-[19px] mb-8 cursor-pointer shrink-0 fill-gray-400 hover:fill-red-500 float-end"
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
        <div className="mb-6 bg-gray-50 p-3 sm:p-4 rounded-lg mt-[33px]">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-gray-600">Order ID</p>
              <p className="font-semibold">#{data._id}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Payment ID</p>
              <p className="font-semibold">#{data.paymentId}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Order Date & Time</p>
              <p className="font-semibold">
                {" "}
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
          </div>
          <div className="mt-4 flex flex-wrap justify-between items-center gap-2">
            <div className="flex items-center">
              <FaCreditCard className="text-blue-500 mr-2" /> Payment Mehod :
              <p
                className={`me-2 mt-1.5 inline-flex items-center rounded px-2.5 py-0.5 text-md font-medium sm:flex sm:flex-col
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
            </div>
            <div className="text-lg font-bold text-blue-600">
              Total Amount ₹ {data.amount}
            </div>
          </div>
        </div>

        <div className="relative ">
          <div className="h-2 bg-gray-200 rounded overflow-hidden ">
            <div
              className="h-full bg-blue-500 transition-all duration-500"
              style={{ width: getProgressWidth() }}
            ></div>
          </div>

          <div className="flex flex-wrap md:flex-nowrap justify-between items-center mt-4 gap-4 px-[60px] ">
            {orderStatuses.map((item) => (
              <div
                key={item.id}
                className="flex flex-col items-center cursor-pointer group w-full sm:w-auto"
                onClick={() =>
                  setShowDetails(showDetails === item.id ? null : item.id)
                }
                role="button"
                tabIndex={0}
                aria-label={`${item.label} status details`}
              >
                <div
                  className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center mb-2 transition-all duration-300 ${getStatusColor(
                    item.status,
                    item.status
                  )}`}
                >
                  {item.icon}
                </div>
                <span className="text-xs sm:text-sm font-medium text-gray-700 text-center">
                  {item.label}
                </span>
                <span className="text-xs text-gray-500">{item.date}</span>

                {showDetails === item.id && (
                  <div className="absolute mt-2 p-3 sm:p-4 bg-white rounded-lg shadow-lg border border-gray-200 z-10 w-[calc(100%-2rem)] sm:w-64 left-1/2 transform -translate-x-1/2 sm:translate-x-0 sm:left-auto">
                    <p className="text-sm text-gray-600 mb-2">
                      {item.description}
                    </p>
                    {data?.status=== "Shipped" && (
                      <p className="text-sm text-gray-600">
                        Tracking Number:{" "}
                        <span className="font-medium">{data._id}</span>
                      </p>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 border-t pt-6">
          <h3 className="text-xl font-semibold mb-4">Order Details</h3>
          {data?.products.map((product, index) => (
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-gray-50 p-3 sm:p-4 rounded-lg gap-4 ">
              <div className="flex items-center space-x-4 w-full sm:w-auto">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                  {product?.product?.image
                    ?.slice(0, 1)
                    .map((filename, index) => (
                      <img
                        src={getImageURL(filename)}
                        className="w-full h-full object-cover"
                      />
                    ))}
                </div>
                <div>
                  <h4 className="font-semibold text-base sm:text-lg">
                    {product?.product?.title}
                  </h4>
                  <div className="text-xs sm:text-sm text-gray-600 mt-1">
                    <span className="mr-4">Quantity: {product?.quantity}</span>
                    <span>Net Weight: {product?.product?.packSize}</span>
                  </div>
                </div>
              </div>
              <div className="text-lg sm:text-xl font-bold text-gray-800 w-full sm:w-auto text-right">
                ₹ {product?.product?.discountprice}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 p-3 sm:p-4 bg-gray-50 rounded-lg">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                Need Help?
              </h3>
              <p className="text-gray-600 text-sm">
                Contact our customer support
              </p>
            </div>
            <Link to="https://wa.me/918870566255" target="_blank">
              <button
                className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors w-full sm:w-auto justify-center sm:justify-start"
                aria-label="Contact Support"
              >
                <FaPhoneAlt className="mr-2" />
                Contact Support
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientOrderHistoryModal;
