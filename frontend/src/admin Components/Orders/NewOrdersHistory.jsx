import React, { useEffect, useMemo, useState } from "react";
import { fetchAllOrders, updateOrderStatus } from "../../store/reducers/orderslice";
import { AgGridReact } from "ag-grid-react";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { useDispatch, useSelector } from "react-redux";
import OrderHistorymodal from "./orderHistorymodal";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";

ModuleRegistry.registerModules([AllCommunityModule]);

const rowSelection = {
  mode: "multiRow",
  headerCheckbox: false,
};

function NewOrdersHistory() {
  const dispatch = useDispatch();
  const [columnDefs, setColumnDefs] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const { orders, loading, error } = useSelector((state) => state.orders);
  const [openModal, setOpenModal] = useState(false);
  
  // Date Range State
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  useEffect(() => {
    dispatch(fetchAllOrders());
  }, [dispatch]);

  useEffect(() => {
    setColumnDefs([
      {
        headerName: "Order Id",
        field: "_id",
        sortable: true,
        width: 220,  // Corrected from 'with' to 'width'
        filter: "agTextColumnFilter",
        floatingFilter: true,
      },
      {
        headerName: "Full Name",
        field: "fullName",
        sortable: true,
        filter: "agTextColumnFilter",
        floatingFilter: true,
      },
      {
        headerName: "Phone Number",
        field: "phoneNumber",
        sortable: true,
        filter: "agTextColumnFilter",
        floatingFilter: true,
      },
      {
        headerName: "Status",
        field: "status",
        sortable: true,
        filter: "agTextColumnFilter",
        floatingFilter: true,
        cellRenderer: (params) => {
          const status = params.value;
          let statusClass = "";
          if (status === "Pending") {
            statusClass = "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
          } else if (status === "Packed") {
            statusClass = "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300";
          } else if (status === "Shipped") {
            statusClass = "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
          } else if (status === "Delivered") {
            statusClass = "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
          }

          return (
            <span className={`me-2 mt-1.5 inline-flex items-center rounded px-2.5 py-0.5 text-xs font-medium ${statusClass}`}>
              {status}
            </span>
          );
        },
      },
      {
        headerName: "City",
        field: "city",
        sortable: true,
        filter: "agTextColumnFilter",
        floatingFilter: true,
      },
      {
        headerName: "Order Date",
        field: "createdAt",
        sortable: true,
        filter: "agDateColumnFilter",
        floatingFilter: true,
        valueFormatter: (params) => moment(params.value).format("YYYY-MM-DD HH:mm"),
      },
      {
        headerName: "Actions",
        cellRenderer: (params) => (
          <button
            type="button"
            className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5"
            onClick={() => handleOpenModal(params.data)}
          >
            View
          </button>
        ),
      },
    ]);
  }, []);

  const handleOpenModal = (order) => {
    setSelectedOrder(order);
    setOpenModal(true);
  };

  const handleCloseModal = (updatedOrder) => {
    if (updatedOrder) {
      // Dispatch the action to update status in the Redux store
      dispatch(updateOrderStatus(updatedOrder));

      // Update the order status locally
      const updatedOrders = orders.map((order) =>
        order._id === updatedOrder._id ? updatedOrder : order
      );
      // Optionally, trigger any additional re-render if needed
      // Example: setOrders(updatedOrders);
    }
    setOpenModal(false);
  };

  // Filter orders based on the selected date range
  const filteredOrders = useMemo(() => {
    if (!startDate && !endDate) return orders;
    return orders.filter((order) => {
      const orderDate = moment(order.createdAt);
      if (startDate && endDate) {
        return orderDate.isBetween(startDate, endDate, null, "[]");
      } else if (startDate) {
        return orderDate.isSameOrAfter(startDate);
      } else if (endDate) {
        return orderDate.isSameOrBefore(endDate);
      }
      return true;
    });
  }, [orders, startDate, endDate]);

  const rowData = filteredOrders?.map((order) => ({
    fullName: order.shippingAddress?.fullName || "N/A",
    phoneNumber: order.shippingAddress?.phoneNumber || "N/A",
    status: order.status || "N/A",
    city: order.shippingAddress?.city || "N/A",
    createdAt: order.createdAt,
    _id: order._id,
    products: order.products || [],
    paymentType: order.paymentType,
  })) || [];

  const defaultColDef = useMemo(() => ({
    filter: "agTextColumnFilter",
    floatingFilter: true,
  }), []);

  return (
    <>
      {/* Date Picker Section */}
      <div className="flex gap-4 p-4">
        <div>
          <label className="block text-sm font-semibold mb-2">From Date:</label>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            className="border border-gray-300 p-2 rounded-md"
            placeholderText="Select start date"
            dateFormat="yyyy-MM-dd"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-2">To Date:</label>
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
            className="border border-gray-300 p-2 rounded-md"
            placeholderText="Select end date"
            dateFormat="yyyy-MM-dd"
          />
        </div>
      </div>

      {/* Orders Table */}
      <div style={{ height: 770, width: "100%", padding: "0px 20px 0px 20px" }}>
        <AgGridReact
          loading={loading}
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          rowSelection={rowSelection}
          pagination={true}
          paginationPageSize={1000}
          paginationPageSizeSelector={[1000, 2500, 5000]}
          enableRangeSelection={true}
          enableClipboard={true}
          suppressClipboardPaste={false}
        />
      </div>

      {openModal && selectedOrder && (
        <OrderHistorymodal handleCloseModal={handleCloseModal} order={selectedOrder} />
      )}
    </>
  );
}

export default NewOrdersHistory;
