import {Modal } from "antd";
import { useState } from "react";
import { usePayOrderMutation } from "../redux/features/order/payOrderApi";
const PaidModal = ({status,id}:{status:boolean;id:string}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [payOrder]  = usePayOrderMutation(id)
    const showModal = () => {
      setIsModalOpen(true);
    };
  
    const handleOk =() => {
      setIsModalOpen(false);
      handleChangePaymentStatus()
    };
  
    const handleCancel = () => {
      setIsModalOpen(false);
    };
  
    const handleChangePaymentStatus= async() =>{
       await payOrder(id)
    }
    
  return (
   <>
    <button onClick={showModal}>
    {status ? (
         <p className="p-1 text-center bg-green-400 w-[6rem] rounded-full hover:bg-green-300">
           Paid
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
       Maks As Paid
     </Modal>
   </>
  )
}

export default PaidModal