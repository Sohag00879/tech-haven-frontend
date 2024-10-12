import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useCreateCompareDataMutation } from "../../redux/features/admin/products/crateCompareDataApi";
import { toast } from "react-toastify";

const AddComparison = () => {
  const {id} = useParams()
  const [compareSiteName, setCompareSiteName] = useState<string>("");
  const [comparePrice, setComparePrice] = useState<string>("");
  const [compareDescription, setCompareDescription] = useState<string>("");
  const [createCompareData] = useCreateCompareDataMutation()

  const navigate = useNavigate()


  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const compareData = {
       data:{
        compareSiteName,
        comparePrice,
        compareDescription,
       },
       productId:id
      }
      const res = await createCompareData(compareData)
     if(res.message) toast.success(res.message)
      navigate(`/product/scriping/${id}`)
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <form onSubmit={handleSubmit}
      className="max-w-md mx-auto mt-20 p-6 bg-white border rounded-lg shadow-lg"
    >
      <h2 className="text-2xl font-bold mb-6">Compare Form</h2>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Site URL</label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          value={compareSiteName}
          onChange={(e) => setCompareSiteName(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Price</label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="number"
          value={comparePrice}
          onChange={(e) => setComparePrice(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">
          Description
        </label>
        <textarea
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={compareDescription}
          onChange={(e) => setCompareDescription(e.target.value)}
        ></textarea>
      </div>
      <button
      type="submit"
        className="bg-pink-600 hover:bg-pink-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Submit
      </button>
    </form>
  );
};

export default AddComparison;
