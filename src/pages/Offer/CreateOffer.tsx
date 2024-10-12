import {useState } from "react"
import { useCreateOfferMutation } from "../../redux/features/offer/createOfferApi"
import { toast } from "react-toastify"

const CreateOffer = () => {
    const [percentage,setPercentage] = useState('')
    const [offerReason,setOfferReason] = useState('')
    const [createOffer] = useCreateOfferMutation()


    const handleSubmit = async(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        try {
            const data = {
                percentage,
                offerReason
            }
            const res = await createOffer(data)
            if(res?.data){
                toast.success('Offer Created Successfully');
            }
           
        } catch (error) {
            console.log(error)
        }
    }

   return (
    <div className="bg-white p-10 rounded-lg  w-full mx-auto lg:w-full mt-5">
            <form onSubmit={handleSubmit}>
              <div className="flex justify-between ms-32 mr-32">
              <div className="mb-5">
                    <label className="mb-5 font-bold text-gray-600">Percentage</label>
                    <input onChange={(e)=>setPercentage(e.target.value)} type="text"  className="border border-gray-300 shadow p-2 w-full rounded mb-"/>
                </div>

                <div className="mb-5">
                    <label className="mb-5 font-bold text-gray-600">Purpose</label>
                    <input onChange={(e)=>setOfferReason(e.target.value)} type="text" className="border border-gray-300 shadow p-2 w-full rounded mb-"/>
                </div>

               <div className="flex items-center">
               <button type="submit" className="w-full bg-red-600 text-white font-bold p-2 rounded-lg">Submit</button>
               </div>
              </div>
            </form>
        </div>
  )
}

export default CreateOffer