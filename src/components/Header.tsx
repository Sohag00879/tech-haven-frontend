import { Link } from "react-router-dom";
import Ratings from "../pages/Products/Ratings";
import { useGetTopProductQuery } from "../redux/features/admin/products/getTopProductApi";
import Loader from "./Loader";
import HeartIcon from "../pages/Products/HeartIcon";

type TProduct = {
  _id: string;
  name: string;
  image: string;
  brand: string;
  quantity: number;
  category: string;
  description: string;
  rating: number;
  numReviews: number;
  price: number;
  finalPrice: string;
  countInStock: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  reviews: any[];
  discount: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

const Header = () => {
  const { data, isLoading, error } = useGetTopProductQuery();
  if (isLoading) {
    return <Loader />;
  }
  if (error) {
    return <h1>ERROR</h1>;
  }

  return (
    <div className="mt-20">
      <h1 className="text-center text-4xl text-pink-500 font-semibold">
        Top Products
      </h1>
      <div className="py-5 ps-20 pr-20 relative m-10 grid gap-6 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 w-full max-w-full overflow-hidden rounded-md border border-gray-100  bg-white shadow-sm">
        {data?.map((product: TProduct) => (
          <div
            key={product._id}
            className="flex flex-col overflow-hidden rounded-md border border-gray-100 bg-white shadow-sm"
          >
            <Link
              to={`/product/${product._id}`}
              className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl"
            >
              <img
                className="object-cover"
                src={product.image}
                alt="product image"
              />
              <span className="absolute top-0 left-0 m-2 rounded-full bg-black px-2 text-center text-sm font-medium text-white">
                {product.discount && `${product.discount}% OFF`}
              </span>
              <span className="absolute top-0 right-0 m-2 rounded-full bg-black px-2 text-center text-sm font-medium text-white">
                <HeartIcon product={product} />
              </span>
            </Link>
            <div className="mt-4 px-5 pb-5">
              <Link to={`product/${product._id}`}>
                <h5 className="text-xl tracking-tight text-slate-900">
                  {product.name}
                </h5>
              </Link>
              <div className="mt-2 mb-5 flex items-center justify-between">
                <p>
                  <span className="text-3xl font-bold text-slate-900">
                    ${product.finalPrice ? product.finalPrice : product.price}
                  </span>
                  <span className="text-sm text-slate-900 line-through">
                    {product.finalPrice && product.price}
                  </span>
                </p>
                <div className="flex items-center">
                  <div className="flex justify-between flex-wrap">
                    <Ratings value={product.rating} color="#fde047" />
                  </div>
                </div>
              </div>
              <Link
                to={`/product/${product._id}`}
                className="flex items-center justify-center rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
              >
                BUY NOW
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Header;
