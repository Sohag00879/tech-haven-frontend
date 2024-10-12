import { Link, useParams } from "react-router-dom";
import Messsage from "../../components/Message";
import Loader from "../../components/Loader";
import { useDeliverOrderMutation } from "../../redux/features/order/deliverOrderApi";
import { useGetOrderDetailsQuery } from "../../redux/features/order/getOrderDetailsApi";
type TProduct = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    _id: string | any;
    name: string;
    image: string;
    brand: string;
    // quantity: number;
    qty:number;
    category: string;
    description: string;
    rating: number;
    product?:string;
    numReviews: number;
    price: number;
    finalPrice? : string;
    countInStock: number;
    shippingAddress:{address:string;city:string;postalCode:string;country:string}
    user:{_id:string;userName:string,email:string;}
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    reviews: any[];
    createdAt: string;
    updatedAt: string;
    __v: number;
  }
  
const Order = () => {
  const { id } = useParams();
    useDeliverOrderMutation();
  const {data:order,isLoading,error} = useGetOrderDetailsQuery(id)

  return isLoading ? (
    <Loader />
  ) : error ? (
    <Messsage variant="danger">{error.data.message}</Messsage>
  ) : (
    <div className="container flex flex-col ml-[5rem] md:flex-row">
      <div className="md:w-2/3 pr-4">
        <div className="border gray-300 mt-5 pb-4 mb-5">
          {order?.orderItems?.length === 0 ? (
            <Messsage>Order is empty</Messsage>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-[80%]">
                <thead className="border-b-2">
                  <tr>
                    <th className="p-2">Image</th>
                    <th className="p-2">Product</th>
                    <th className="p-2 text-center">Quantity</th>
                    <th className="p-2">Unit Price</th>
                    <th className="p-2">Total</th>
                  </tr>
                </thead>

                <tbody>
                  {order?.orderItems?.map((item:TProduct, index:number) => (
                    <tr key={index}>
                      <td className="p-2">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover"
                        />
                      </td>

                      <td className="p-2">
                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                      </td>

                      <td className="p-2 text-center">{item.qty}</td>
                      <td className="p-2 text-center">{item.price}</td>
                      <td className="p-2 text-center">
                        $ {(item.price * item.qty).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      <div className="md:w-1/3">
        <div className="mt-5 border-gray-300 pb-4 mb-4">
          <h2 className="text-xl font-bold mb-2">Shipping</h2>
          <p className="mb-4 mt-4">
            <strong className="text-pink-500">Order:</strong> {order?._id}
          </p>

          <p className="mb-4">
            <strong className="text-pink-500">Name:</strong>{" "}
            {order?.user?.userName}
          </p>

          <p className="mb-4">
            <strong className="text-pink-500">Email:</strong> {order?.user?.email}
          </p>
          <p className="mb-4">
            <strong className="text-pink-500">Contact:</strong> {order?.shippingAddress.contact}
          </p>

          <p className="mb-4">
            <strong className="text-pink-500">Address:</strong>{" "}
            {order?.shippingAddress.address}, {order?.shippingAddress.city}{" "}
            {order?.shippingAddress.postalCode}, {order?.shippingAddress.country}
          </p>

          <p className="mb-4">
            <strong className="text-pink-500">Method:</strong>{" "}
            {`Cash On Delivery`}
          </p>
          {order.isPaid ? (
            <Messsage variant="success">Paid on {order.paidAt}</Messsage>
          ) : (
            <Messsage variant="danger">Not paid</Messsage>
          )}
        </div>
        <h2 className="text-xl font-bold mb-2 mt-[2rem]">Order Summary</h2>
        <div className="flex justify-between mb-2">
          <span>Items</span>
          <span className="text-black">$ {order?.itemsPrice}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span>Shipping</span>
          <span>$ {order?.shippingPrice}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span>Tax</span>
          <span>$ {order?.taxPrice}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span>Total</span>
          <span>$ {order?.totalPrice}</span>
        </div>
      </div>
    </div>
  );
};

export default Order;