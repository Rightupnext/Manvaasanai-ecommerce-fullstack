import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { myOrders } from "../../store/reducers/userReducers";
import ClientOrderHistoryModal from "./ClientOrderHistoryModal";
function ClientOrderHistory() {
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => {
    setOpenModal(!openModal);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };
  const { data, status, error } = useSelector((state) => state.auth.myOrders);
  console.log("my orders", data?.orders);
  useEffect(() => {
    dispatch(myOrders());
  }, [dispatch]);
  return (
    <>
      <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
        <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
          <div className="mx-auto max-w-5xl">
            
            <div className="gap-4 sm:flex sm:items-center sm:justify-between">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
                My orders
              </h2>
            </div>
            <div className="mt-6 flow-root sm:mt-8">
              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {data?.orders.map((order, index) => (
                  <div className="flex flex-wrap items-center gap-y-4 py-6">
                    <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                      <dt className="text-base font-medium text-gray-500 dark:text-gray-400">
                        Order ID:
                      </dt>
                      <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">
                        <a href="#" className="hover:underline">
                          #{order._id}
                        </a>
                      </dd>
                    </dl>
                    <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                      <dt className="text-base font-medium text-gray-500 dark:text-gray-400">
                        Date:
                      </dt>
                      <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white px-2">
                        {new Date(order.createdAt).toLocaleDateString("en-GB")}
                      </dd>
                    </dl>
                    <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                      <dt className="text-base font-medium text-gray-500 dark:text-gray-400">
                        PaymentType:
                      </dt>
                      <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">
                        ${order.paymentType}
                      </dd>
                    </dl>
                    <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                      <dt className="text-base font-medium text-gray-500 dark:text-gray-400">
                       Order Status:
                      </dt>
                      <dd
                        className={`me-2 mt-1.5 inline-flex items-center rounded px-2.5 py-0.5 text-xs font-medium
    ${
      order.status === "Pending"
        ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
        : ""
    }
    ${
      order.status === "Packed"
        ? "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300"
        : ""
    }
    ${
      order.status === "Shipped"
        ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
        : ""
    }
    ${
      order.status === "Delivered"
        ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
        : ""
    }
  `}
                      >
                        {order.status}
                      </dd>
                    </dl>
                    <div className="w-full grid sm:grid-cols-2 lg:flex lg:w-64 lg:items-center lg:justify-end gap-4">
                      <button
                        onClick={handleOpenModal}
                        className="w-full inline-flex justify-center rounded-lg  border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700 lg:w-auto"
                      >
                        View details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      {openModal && 
        <ClientOrderHistoryModal
          handleCloseModal={handleCloseModal}
          data={data}
        />
      }
    </>
  );
}

export default ClientOrderHistory;
