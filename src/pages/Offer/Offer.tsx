import { useEffect, useState } from "react";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { toast } from "react-toastify";
import { FaCheck, FaEdit, FaTrash } from "react-icons/fa";
import { useGetOfferQuery } from "../../redux/features/offer/getOfferApi";
import { useDeleteOfferMutation } from "../../redux/features/offer/deleteOfferApi";
import { useUpdateOfferMutation } from "../../redux/features/offer/updateOfferApi";
import CreateOffer from "./CreateOffer";
import AdminMenu from "../Admin/AdminMenu";

type TOffer = {
  _id:string | null;
  percentage:string;
  offerReason:string;
  createdAt:string;
  updatedAt:string;
  _v:number;
}

const Offer = () => {
  const { data: offer, refetch, isLoading, error } = useGetOfferQuery();

  const [deleteOffer] = useDeleteOfferMutation();
  const [updateOffer] = useUpdateOfferMutation();
  const [editableOfferId, setEditableOfferId] = useState<string | null>(null);

  const [percentage, setPercentage] = useState('');
  const [offerReason, setOfferReason] = useState("");

  useEffect(()=>{
    refetch()
  },[refetch])

  const deleteHandler = async (id:string | null) => {
    if (window.confirm("Are you sure")) {
      try {
        await deleteOffer(id);
        refetch();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err:any) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  const toggleEdit = (id:string|null ,percentage:string,offerReason:string) => {
    setEditableOfferId(id);
    setPercentage(percentage);
    setOfferReason(offerReason);
  };

  const updateHandler = async (id:string | null) => {
    const updatedData = {
      offerId : id,
      data:{
        percentage,
        offerReason
      }
    }
    try {
       await updateOffer(updatedData);
      setEditableOfferId(null);
      refetch();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err:any) {
      toast.error(err?.data?.message || err.error);
    }
  };


  return (
  <>
  <CreateOffer/>
    <div className="p-4">
       <h1 className="text-2xl font-semibold mb-4 text-center">Offer</h1>
       {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <div className="flex flex-col md:flex-row">
          <AdminMenu />
          <table className="w-full md:w-4/5 mx-auto">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left">ID</th>
                <th className="px-4 py-2 text-left">Percentage</th>
                <th className="px-4 py-2 text-left">Purpose</th>
                <th className="px-4 py-2 text-left">Action</th>
                <th className="px-4 py-2"></th>
              </tr>
            </thead>
            <tbody>
              {offer.map((offer:TOffer) => (
                <tr key={offer._id}>
                  <td className="px-4 py-2">{offer._id}</td>
                  <td className="px-4 py-2">
                    {editableOfferId === offer._id ? (
                      <div className="flex items-center">
                        <input
                          type="text"
                          value={percentage}
                          onChange={(e) => setPercentage(e.target.value)}
                          className="w-full p-2 border rounded-lg text-black"
                        />
                        <button
                          onClick={() => updateHandler(offer._id)}
                          className="ml-2 bg-blue-500 text-white py-2 px-4 rounded-lg"
                        >
                          <FaCheck />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center">
                        {offer.percentage}{" "}
                        <button
                          onClick={() =>
                            toggleEdit(offer._id, offer.percentage, offer.offerReason)
                          }
                        >
                          <FaEdit className="ml-[1rem]" />
                        </button>
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-2">
                    {editableOfferId === offer._id ? (
                      <div className="flex items-center">
                        <input
                          type="text"
                          value={offerReason}
                          onChange={(e) => setOfferReason(e.target.value)}
                          className="w-full p-2 border rounded-lg text-black"
                        />
                        <button
                          onClick={() => updateHandler(offer._id)}
                          className="ml-2 bg-blue-500 text-white py-2 px-4 rounded-lg"
                        >
                          <FaCheck />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <a href={`mailto:${offer.offerReason}`}>{offer.offerReason}</a>{" "}
                        <button
                          onClick={() =>
                            toggleEdit(offer._id, offer.percentage, offer.offerReason)
                          }
                        >
                          <FaEdit className="ml-[1rem]" />
                        </button>
                      </div>
                    )}
                  </td>
                  {/* <td className="px-4 py-2">
                    {offer.isAdmin ? (
                      <FaCheck style={{ color: "green" }} />
                    ) : (
                      <FaTimes style={{ color: "red" }} />
                    )}
                  </td> */}
                  <td className="px-4 py-2">
                  <div className="flex">
                        <button
                          onClick={() => deleteHandler(offer._id)}
                          className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                        >
                          <FaTrash />
                        </button>
                      </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  </>
  )
}

export default Offer;