import { useState } from "react";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import OrderStatusModal from "../../components/OrderStatusModal";
import { useGetTotalOrdersByTimeQuery } from "../../redux/features/order/getTotalOrdersByTimeApi";
import AdminMenu from "./AdminMenu";

const AllOrder = () => {
  const [selectedTimeFrame, setSelectedTimeFrame] = useState<string>("all");
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [selectedPaidStatus, setSelectedPaidStatus] = useState<boolean | null>(
    null
  );
  const [selectedDeliveredStatus, setSelectedDeliveredStatus] = useState<
    boolean | null
  >(null);
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 10;

  // Fetch orders based on selected time frame and page number
  const {
    data: orders,
    isLoading,
    error,
  } = useGetTotalOrdersByTimeQuery({
    timeFrame: selectedTimeFrame,
    page: currentPage,
    limit: itemsPerPage,
  });

  const openModal = (orderId: string, paid: boolean, delivered: boolean) => {
    setSelectedOrderId(orderId);
    setSelectedPaidStatus(paid);
    setSelectedDeliveredStatus(delivered);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const totalPages = orders ? Math.ceil(orders.totalOrders / itemsPerPage) : 1;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <>
      <AdminMenu />
      <div className="container mx-auto mt-5">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-xl font-bold">Manage Orders</h1>
            <h1>Total Orders: {orders?.totalOrders}</h1>
          </div>
          <select
            value={selectedTimeFrame}
            onChange={(e) => setSelectedTimeFrame(e.target.value)}
            className="border border-gray-300 rounded-md py-2 px-4 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="all">All</option>
            <option value="day">Last 24 hours</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="year">This Year</option>
          </select>
        </div>

        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">
            {error?.data?.message || error.error}
          </Message>
        ) : (
          <>
            <table className="table-auto w-full bg-white shadow-md rounded-lg overflow-hidden">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">
                    ITEMS
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">
                    ID
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">
                    USER
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">
                    DATE
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">
                    TOTAL
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">
                    PAID
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">
                    DELIVERED
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">
                    ACTIONS
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {orders?.items?.map((order) => (
                  <tr key={order._id} className="hover:bg-gray-50">
                    <td className="px-4 py-2">
                      <img
                        src={order.orderItems[0]?.docAvatar?.url}
                        alt={order._id}
                        className="w-16 h-16 object-cover rounded"
                      />
                    </td>
                    <td className="px-4 py-2">{order._id}</td>
                    <td className="px-4 py-2">
                      {order.user?.userName || "N/A"}
                    </td>
                    <td className="px-4 py-2">
                      {order.createdAt.substring(0, 10)}
                    </td>
                    <td className="px-4 py-2">$ {order.totalPrice}</td>
                    <td className="px-4 py-2">
                      {order.isPaid ? (
                        <span className="text-green-500 font-semibold">
                          Yes
                        </span>
                      ) : (
                        <span className="text-red-500 font-semibold">No</span>
                      )}
                    </td>
                    <td className="px-4 py-2">
                      {order.isDelivered ? (
                        <span className="text-green-500 font-semibold">
                          Yes
                        </span>
                      ) : (
                        <span className="text-red-500 font-semibold">No</span>
                      )}
                    </td>
                    <td className="px-4 py-2">
                      <button
                        className="bg-indigo-500 text-white py-2 px-4 rounded hover:bg-indigo-600 transition duration-200"
                        onClick={() =>
                          openModal(order._id, order.isPaid, order.isDelivered)
                        }
                      >
                        Edit Status
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination */}
            <div className="flex justify-between items-center mt-4">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 disabled:bg-gray-200 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <span className="text-sm">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 disabled:bg-gray-200 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>

      {showModal &&
        selectedOrderId &&
        selectedPaidStatus !== null &&
        selectedDeliveredStatus !== null && (
          <OrderStatusModal
            orderId={selectedOrderId}
            currentPaidStatus={selectedPaidStatus}
            currentDeliveredStatus={selectedDeliveredStatus}
            onClose={closeModal}
          />
        )}
    </>
  );
};

export default AllOrder;
