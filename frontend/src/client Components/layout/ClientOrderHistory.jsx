import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { myOrders } from "../../store/reducers/userReducers";
import ClientOrderHistoryModal from "./ClientOrderHistoryModal";

function ClientOrderHistory() {
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  const [selectOrder, setSelectOrder] = useState(null); 
  const { data, status, error } = useSelector((state) => state.auth.myOrders);

  const handleOpenModal = (order) => {
    setOpenModal(true); 
    setSelectOrder(order); 
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectOrder(null);
  };


  useEffect(() => {
    dispatch(myOrders());
  }, [dispatch]);
  
  return (
    <>
<section className="bg-white py-3 antialiased dark:bg-gray-900 md:py-16 mx-0">
  <div className="mx-auto max-w-screen-xl overflow-hidden sm:px-6 md:px-6 lg:px-8">
    <div className="w-full">
      <div className="flex items-center justify-between gap-4 p-4 sm:px-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
          My orders
        </h2>
      </div>

     <div className="mt-6 flow-root sm:mt-8 sm:px-2.5">
  <div className="divide-y divide-gray-200 dark:divide-gray-700">
    {Array.isArray(data?.orders) && data?.orders.length > 0 ? (
      [...data.orders].reverse().map((order, index) => (
        <div
          key={index}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 items-center py-6 lg:w-full xl:w-full"
        >
          <div className="flex-1">
            <dt className="text-base font-medium text-gray-500 dark:text-gray-400">
              Order ID:
            </dt>
            <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">
              {order._id}
            </dd>
          </div>

          <div className="flex-1">
            <dt className="text-base font-medium text-gray-500 dark:text-gray-400">
              Order Date:
            </dt>
            <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white px-2">
              {new Date(order.createdAt).toLocaleString("en-GB", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "numeric",
                minute: "numeric",
                second: "numeric",
                hour12: true,
              })}
            </dd>
          </div>

          <div className="flex-1">
            <dt className="text-base font-medium text-gray-500 dark:text-gray-400">
              Payment Type:
            </dt>
            <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">
              ₹{order.paymentType}
            </dd>
          </div>

          <div className="flex-1">
            <dt className="text-base font-medium text-gray-500 dark:text-gray-400">
              Order Status:
            </dt>
            <dd
              className={`mt-1.5 inline-flex items-center rounded px-2.5 py-0.5 text-xs font-medium
                ${order.status === "Pending" ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300" : ""}
                ${order.status === "Packed" ? "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300" : ""}
                ${order.status === "Shipped" ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300" : ""}
                ${order.status === "Delivered" ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300" : ""}
              `}
            >
              {order.status}
            </dd>
          </div>

          <div className="flex-1">
            <button
              onClick={() => handleOpenModal(order)}
              className="max-w-[150px] lg:max-w-[200px] inline-flex justify-center rounded-lg border border-gray-300 bg-gray-100 px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-200 focus:z-10 focus:outline-none focus:ring-4 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              View details
            </button>
          </div>
        </div>
      ))
    ) : (
      <p className="text-gray-500 dark:text-gray-400 text-center py-4">
        No orders available.
      </p>
    )}
  </div>
</div>

    </div>
  </div>
</section>




      {openModal && selectOrder && (
        <ClientOrderHistoryModal
          handleCloseModal={handleCloseModal}
          data={selectOrder}
        />
      )}
    </>
  );
}

export default ClientOrderHistory;
