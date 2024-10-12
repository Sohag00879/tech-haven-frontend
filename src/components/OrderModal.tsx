import {Modal } from "antd";
import { useState } from "react";
import { useDeliverOrderMutation } from "../redux/features/order/deliverOrderApi";

const OrderModal = ({ status,id }: { status: boolean,id:string; }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deliverOrder]  = useDeliverOrderMutation(id)
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk =() => {
    setIsModalOpen(false);
    handleChangeOrderStatus()
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleChangeOrderStatus= async() =>{
     await deliverOrder(id)
  }
  return (
    <>
     <button onClick={showModal}>
     {status ? (
          <p className="p-1 text-center bg-green-400 w-[6rem] rounded-full hover:bg-green-300">
            Completed
          </p>
        ) : (
          <p className="p-1 text-center bg-red-400 w-[6rem] rounded-full hover:bg-red-300">
            Pending
          </p>
        )}
     </button>
      <Modal
        title=""
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        Maks As Delivered
      </Modal>
    </>
  );
};

export default OrderModal;
