import { Link } from "react-router-dom";
import HeartIcon from "./HeartIcon";
// import HeartIcon from "./HeartIcon";

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

const SmallProduct = ({ product }: { product: IProduct }) => {
  return (
    <div className="w-[18rem] ml-[2rem] p-3">
      <div className="relative">
        <img
          src={product?.docAvatar?.url}
          alt={product.name}
          className="h-auto rounded"
        />
        <HeartIcon product={product} />
      </div>
      <div className="p-4">
        <Link to={`/product/${product._id}`}>
          <h2 className="flex justify-between items-center">
            <div>{product.name}</div>
            <span className="bg-pink-100 text-pink-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-pink-900 dark:text-pink-300">
              ${product.price}
            </span>
          </h2>
        </Link>
      </div>
    </div>
  );
};
export default SmallProduct;
