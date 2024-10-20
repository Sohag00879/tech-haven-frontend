import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { useGetMyOrdersQuery } from "../../redux/features/order/getMyOrdersApi";

type Order = {
  shippingAddress: {
    address: string;
    city: string;
    postalCode: string;
    country: string;
  };
  _id: string;
  user: {
    _id: string;
    userName: string;
    email: string;
  };
  orderItems: {
    name: string;
    qty: number;
    image: string;
    price: number;
    product: string;
    _id: string;
  }[];
  itemsPrice: number;
  taxPrice: number;
  shippingPrice: number;
  totalPrice: number;
  isPaid: boolean;
  paidAt: string;
  isDelivered: boolean;
  deliveredAt: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

const UserOrder = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { user } = useSelector((state: any) => state.auth);
  const { data: orders, isLoading, error } = useGetMyOrdersQuery(user?._id);
  return (
    <div>
      {orders?.length > 0 ? (
        <div className="container mx-auto ml-[5rem]">
          <h2 className="text-2xl font-semibold mb-4">My Orders </h2>

          {isLoading ? (
            <Loader />
          ) : error ? (
            <Message variant="danger">
              {error?.data?.error || error.error}
            </Message>
          ) : (
            <table className="w-full">
              <thead>
                <tr>
                  <td className="py-2">IMAGE</td>
                  <td className="py-2">ID</td>
                  <td className="py-2">DATE</td>
                  <td className="py-2">TOTAL</td>
                  <td className="py-2">PAID</td>
                  <td className="py-2">DELIVERED</td>
                  <td className="py-2"></td>
                </tr>
              </thead>

              <tbody>
                {orders.map((order: Order) => (
                  <tr key={order?._id}>
                    <img
                      src={order?.orderItems[0]?.docAvatar?.url}
                      className="w-[6rem] mb-5"
                    />

                    <td className="py-2">{order?._id}</td>
                    <td className="py-2">
                      {order?.createdAt.substring(0, 10)}
                    </td>
                    <td className="py-2">$ {order?.totalPrice}</td>

                    <td className="py-2">
                      {order?.isPaid ? (
                        <p className="p-1 text-center bg-green-400 w-[6rem] rounded-full">
                          Completed
                        </p>
                      ) : (
                        <p className="p-1 text-center bg-red-400 w-[6rem] rounded-full">
                          Pending
                        </p>
                      )}
                    </td>

                    <td className="px-2 py-2">
                      {order?.isDelivered ? (
                        <p className="p-1 text-center bg-green-400 w-[6rem] rounded-full">
                          Completed
                        </p>
                      ) : (
                        <p className="p-1 text-center bg-red-400 w-[6rem] rounded-full">
                          Pending
                        </p>
                      )}
                    </td>

                    <td className="px-2 py-2">
                      <Link to={`/order/${order?._id}`}>
                        <button className="bg-pink-400 text-back py-2 px-3 rounded">
                          View Details
                        </button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      ) : (
        <h2 className="text-2xl font-semibold mb-4 text-center">No Orders </h2>
      )}
    </div>
  );
};

export default UserOrder;
