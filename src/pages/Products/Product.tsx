import { Link } from "react-router-dom";
import HeartIcon from "./HeartIcon";

interface IProduct {
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
  countInStock: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  reviews: any[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

const Product = ({ product }: { product: IProduct }) => {
  return (
    <div className="w-[20rem] m-4 p-3 bg-black text-white rounded-lg shadow-lg border border-gray-800">
      <div className="relative">
        <img
          src={product?.docAvatar?.url}
          alt={product?.name}
          className="w-full h-48 object-cover rounded-t-lg"
        />
        <HeartIcon product={product} />
      </div>
      <div className="p-4">
        <Link to={`/product/${product?._id}`}>
          <h2 className="flex justify-between items-center">
            <div className="text-lg font-semibold">{product?.name}</div>
            <span className="bg-gray-800 text-pink-300 text-sm font-medium mr-2 px-2.5 py-0.5 rounded-full">
              ${product?.price}
            </span>
          </h2>
        </Link>
      </div>
    </div>
  );
};

export default Product;
