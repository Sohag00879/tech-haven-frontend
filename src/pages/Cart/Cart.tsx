import { FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { addToCart, removeFromCart } from "../../redux/features/cart/cartSlice";

type TProduct = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  _id: string | any;
  name: string;
  image: string;
  brand: string;
  qty: number;
  category: string;
  description: string;
  rating: number;
  numReviews: number;
  price: number;
  finalPrice?: string;
  countInStock: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  reviews: any[];
  createdAt: string;
  updatedAt: string;
  __v: number;
};

const Cart = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const cart = useSelector((state: any) => state.cartItems);
  const { cartItems } = cart;

  const addToCartHandler = (product: TProduct, qty: number) => {
    dispatch(addToCart({ ...product, qty }));
  };

  const removeFromCartHandler = (id: string) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = async () => {
    navigate("/shipping");
  };
  return (
    <>
      <div className="container  justify-around items-start flex wrap mx-auto mt-8">
        {cartItems?.length === 0 ? (
          <div>
            Your cart is empty <Link to="/shop">Go To Shop</Link>
          </div>
        ) : (
          <>
            <div className="flex flex-col w-[80%]">
              <h1 className="text-2xl font-semibold mb-4">Shopping Cart</h1>

              {cartItems?.map((item: TProduct) => (
                <div key={item._id} className="flex items-enter mb-[1rem] pb-2">
                  <div className="w-[5rem] h-[5rem]">
                    <img
                      src={item?.docAvatar?.url}
                      alt={item.name}
                      className="w-full h-full object-cover rounded"
                    />
                  </div>

                  <div className="flex-1 ml-4">
                    <Link to={`/product/${item._id}`} className="text-pink-500">
                      {item.name}
                    </Link>

                    <div className="mt-2 text-black">{item.brand}</div>
                    <div className="mt-2 text-black font-bold">
                      $ {item.finalPrice ? item.finalPrice : item.price}
                    </div>
                  </div>

                  <div className="w-24">
                    <select
                      className="w-full p-1 border rounded text-black"
                      value={item.qty}
                      onChange={(e) =>
                        addToCartHandler(item, Number(e.target.value))
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <button
                      className="text-red-500 mr-[5rem]"
                      onClick={() => removeFromCartHandler(item._id)}
                    >
                      <FaTrash className="ml-[1rem] mt-[.5rem]" />
                    </button>
                  </div>
                </div>
              ))}

              <div className="mt-8 w-[40rem]">
                <div className="p-4 rounded-lg">
                  <h2 className="text-xl font-semibold mb-2">
                    Items (
                    {cartItems?.reduce(
                      (acc: number, item: { qty: number; price: number }) =>
                        acc + item.qty,
                      0
                    )}
                    )
                  </h2>

                  <div className="text-2xl font-bold">
                    ${" "}
                    {cartItems
                      ?.reduce(
                        (
                          acc: number,
                          item: {
                            qty: number;
                            price: number;
                            finalPrice: string;
                          }
                        ) =>
                          acc +
                          item.qty *
                            (item.finalPrice
                              ? Number(item.finalPrice)
                              : item.price),
                        0
                      )
                      .toFixed(0)}
                  </div>

                  <button
                    className="bg-pink-500 mt-4 py-2 px-4 rounded-full text-lg w-full"
                    disabled={cartItems?.length === 0}
                    onClick={checkoutHandler}
                  >
                    Proceed To Checkout
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Cart;
