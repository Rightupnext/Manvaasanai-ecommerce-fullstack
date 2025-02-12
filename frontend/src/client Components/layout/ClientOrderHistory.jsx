import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { myOrders } from "../../store/reducers/userReducers";
import ClientOrderHistoryModal from "./ClientOrderHistoryModal";

function ClientOrderHistory() {
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  const [selectOrder, setSelectOrder] = useState(null); // Ensure the default value is null
  const { data, status, error } = useSelector((state) => state.auth.myOrders);

  const handleOpenModal = (order) => {
    setOpenModal(true); // Open the modal
    setSelectOrder(order); // Set the selected order
  };

  const handleCloseModal = () => {
    setOpenModal(false); // Close the modal
    setSelectOrder(null); // Reset the selected order
  };

  console.log("my orders", data?.orders);

  useEffect(() => {
    if (!data) {
      dispatch(myOrders());
    }
  }, [dispatch, data]);
  
  return (
    <>
<section className="bg-white py-3 antialiased dark:bg-gray-900 md:py-16 mx-0">
  <div className="mx-auto max-w-screen-xl overflow-x-auto sm:ml-[5px] sm:mr-[5px] md:ml-[5px] md:mr-[5px]">
    <div className="min-w-[1200px]">
      <div className="gap-4 sm:flex ml-[5px] p-[5px] sm:items-center sm:justify-between m-[3px]">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
          My orders
        </h2>
      </div>
      <div className="mt-6 flow-root sm:mt-8 px-8">
  <div className="divide-y divide-gray-200 dark:divide-gray-700">
    {Array.isArray(data?.orders) && data?.orders.length > 0 ? (
      [...data.orders].reverse().map((order, index) => (
        <div key={index} className="w-full flex flex-wrap lg:flex-nowrap justify-between items-center gap-6 py-6">
          <dl className="min-w-[150px] flex-1">
            <dt className="text-base font-medium text-gray-500 dark:text-gray-400">
              Order ID:
            </dt>
            <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">
              <p className="truncate sm:w-20 md:w-20 lg:w-auto xl:w-auto">
                <span className="sm:inline md:inline lg:hidden xl:hidden">
                  {order._id.length > 5 ? `${order._id.slice(0, 5)}...` : order._id}
                </span>
                <span className="hidden lg:inline xl:inline">{order._id}</span>
              </p>
            </dd>
          </dl>
          <dl className="min-w-[200px] flex-1">
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
          </dl>
          <dl className="min-w-[150px] flex-1">
            <dt className="text-base font-medium text-gray-500 dark:text-gray-400">
              Payment Type:
            </dt>
            <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">
              ₹{order.paymentType}
            </dd>
          </dl>
          <dl className="min-w-[150px] flex-1">
            <dt className="text-base font-medium text-gray-500 dark:text-gray-400">
              Order Status:
            </dt>
            <dd
              className={`me-2 mt-1.5 inline-flex items-center rounded px-2.5 py-0.5 text-xs font-medium
                ${order.status === "Pending" ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300" : ""}
                ${order.status === "Packed" ? "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300" : ""}
                ${order.status === "Shipped" ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300" : ""}
                ${order.status === "Delivered" ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300" : ""}
              `}
            >
              {order.status}
            </dd>
          </dl>
          <div className="min-w-[120px] flex-1">
            <button
              onClick={() => handleOpenModal(order)}
              className="w-full lg:w-auto inline-flex justify-center rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
            >
              View details
            </button>
          </div>
        </div>
      ))
    ) : (
      <p>No orders available.</p>
    )}
  </div>
</div>


    </div>
  </div>
</section>





      {openModal && selectOrder && (
        <ClientOrderHistoryModal
          handleCloseModal={handleCloseModal}
          data={selectOrder} // Send the selected order to the modal
        />
      )}
    </>
  );
}

export default ClientOrderHistory;
