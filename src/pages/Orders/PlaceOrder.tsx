import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import ProgressSteps from "../../components/ProgressSteps";
import { clearCartItems } from "../../redux/features/cart/cartSlice";
import { useCreateOrderMutation } from "../../redux/features/order/createOrderApi";

type TProduct = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  _id: string | any;
  name: string;
  image: string;
  brand: string;
  // quantity: number;
  qty: number;
  category: string;
  description: string;
  rating: number;
  product?: string;
  numReviews: number;
  price: number;
  countInStock: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  reviews: any[];
  createdAt: string;
  updatedAt: string;
  contact: string;
  __v: number;
};

const PlaceOrder = () => {
  const navigate = useNavigate();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const cart = useSelector((state: any) => state.cartItems);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { user } = useSelector((state: any) => state.auth);
  const [createOrder, { isLoading, error }] = useCreateOrderMutation();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any

  useEffect(() => {
    if (!cart.shippingAddress.address) {
      navigate("/shipping");
    }
  }, [cart.shippingAddress.address, navigate]);

  const dispatch = useDispatch();
  const placeOrderHandler = async () => {
    console.log(cart);
    try {
      const order = {
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
        user,
      };
      const res = await createOrder(order).unwrap();
      dispatch(clearCartItems());
      navigate(`/order/${res._id}`);
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <>
      <ProgressSteps step1 step2 step3 />

      <div className="container mx-auto mt-8 ml-[5rem] pr-[3rem]">
        {cart.cartItems.length === 0 ? (
          <Message>Your cart is empty</Message>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <td className="px-1 py-2 text-left align-top">Image</td>
                  <td className="px-1 py-2 text-left">Product</td>
                  <td className="px-1 py-2 text-left">Quantity</td>
                  <td className="px-1 py-2 text-left">Price</td>
                  <td className="px-1 py-2 text-left">Total</td>
                </tr>
              </thead>

              <tbody>
                {cart.cartItems.map((item: TProduct, index: number) => (
                  <tr key={index}>
                    <td className="p-2">
                      <img
                        src={item?.docAvatar?.url}
                        alt={item.name}
                        className="w-16 h-16 object-cover"
                      />
                    </td>

                    <td className="p-2">
                      <Link to={`/product/${item.product}`}>{item.name}</Link>
                    </td>
                    <td className="p-2">{item.qty}</td>
                    <td className="p-2">{item.price.toFixed(0)}</td>
                    <td className="p-2">
                      $ {(item.qty * item.price).toFixed(0)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {cart.cartItems.length !== 0 && (
          <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-5">Order Summary</h2>
            <div className="flex justify-between flex-wrap p-8 bg-[#181818] text-white">
              <ul className="text-lg">
                <li>
                  <span className="font-semibold mb-4">Items:</span> $
                  {cart?.itemsPrice}
                </li>
                <li>
                  <span className="font-semibold mb-4">Shipping:</span> $
                  {cart?.shippingPrice}
                </li>
                <li>
                  <span className="font-semibold mb-4">Tax:</span> $
                  {cart?.taxPrice}
                </li>
                <li>
                  <span className="font-semibold mb-4">Total:</span> $
                  {cart?.totalPrice}
                </li>
              </ul>

              {error && (
                <Message variant="danger">{error.data.message}</Message>
              )}

              <div>
                <h2 className="text-2xl font-semibold mb-4">Shipping</h2>
                <p>
                  <strong>Address:</strong> {cart.shippingAddress.address},{" "}
                  {cart.shippingAddress.city} {cart.shippingAddress.postalCode},{" "}
                  {cart.shippingAddress.country}
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold mb-4">Payment Method</h2>
                <strong>Method:</strong> Cash On Delivery
              </div>
            </div>

            <button
              type="button"
              className="bg-pink-500 text-white py-2 px-4 rounded-full text-lg w-full mt-4"
              disabled={cart.cartItems === 0}
              onClick={placeOrderHandler}
            >
              Place Order
            </button>

            {isLoading && <Loader />}
          </div>
        )}
      </div>
    </>
  );
};

export default PlaceOrder;
