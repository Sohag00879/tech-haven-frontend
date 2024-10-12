import { useState } from "react";
import { useUpdateOrderStatusMutation } from "../redux/features/order/updateOrderStatusApi";

type OrderStatusModalProps = {
  orderId: string;
  currentPaidStatus: boolean;
  currentDeliveredStatus: boolean;
  onClose: () => void;
};

const OrderStatusModal = ({ orderId, currentPaidStatus, currentDeliveredStatus, onClose }: OrderStatusModalProps) => {
  const [isPaid, setIsPaid] = useState(currentPaidStatus);
  const [isDelivered, setIsDelivered] = useState(currentDeliveredStatus);
  
  const [updateOrderStatus, { isLoading, isSuccess }] = useUpdateOrderStatusMutation();

  const handleSave = async () => {
    try {
      await updateOrderStatus({ orderId, isPaid, isDelivered });
      onClose(); // Close the modal after saving
    } catch (error) {
      console.error("Failed to update order status", error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white w-full max-w-lg rounded-lg shadow-lg transform transition-all duration-300">
        <div className="p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Update Order Status</h2>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-gray-600 font-medium">Paid Status:</label>
              <input
                type="checkbox"
                className="w-6 h-6 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                checked={isPaid}
                onChange={(e) => setIsPaid(e.target.checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="text-gray-600 font-medium">Delivered Status:</label>
              <input
                type="checkbox"
                className="w-6 h-6 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                checked={isDelivered}
                onChange={(e) => setIsDelivered(e.target.checked)}
              />
            </div>
          </div>

          <div className="mt-6 flex justify-end space-x-4">
            <button
              onClick={onClose}
              className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition duration-200 ease-in-out"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={isLoading}
              className={`px-4 py-2 rounded-lg text-white ${isLoading ? 'bg-indigo-400' : 'bg-indigo-600 hover:bg-indigo-700'} transition duration-200 ease-in-out`}
            >
              {isLoading ? 'Saving...' : 'Save'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderStatusModal;
