import { Link } from "react-router-dom";
import { useGetProductsByCategoryQuery } from "../../redux/features/admin/category/getProductsByCategoryApi";
import HeartIcon from "./HeartIcon";

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
  finalPrice?: string;
  countInStock: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  reviews: any[];
  discount: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

const ProductsByCategory = ({ category }: { category: string }) => {
  const { data: products } = useGetProductsByCategoryQuery(category);
  console.log(products);

  return (
    <>
      <h1 className="text-center text-2xl font-bold mb-5 text-gray-500">
        Related Products
      </h1>
      <div className="ml-[20rem] mb-5 flex flex-wrap justify-center gap-6">
        {products?.map((product: TProduct) => (
          <div
            className="w-[18rem] ml-[2rem] p-3 bg-gradient-to-b from-gray-800 to-gray-900 text-white rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            key={product._id}
          >
            <div className="relative">
              <Link to={`/product/${product._id}`}>
                <img
                  src={product?.docAvatar?.url}
                  alt={product?.name}
                  className="h-48 w-full object-cover rounded-t-md transition-transform duration-300 ease-in-out transform hover:scale-110"
                />
              </Link>
              <div className="absolute top-2 right-2">
                <HeartIcon product={product} />
              </div>
            </div>
            <div className="p-4">
              <Link to={`/product/${product?._id}`}>
                <h2 className="text-lg font-semibold mb-2 text-gray-100 truncate">
                  {product?.name}
                </h2>
              </Link>
              <div className="flex justify-between items-center">
                <span className="bg-pink-600 text-pink-100 text-xs font-medium px-3 py-1 rounded-full">
                  ${product.finalPrice ? product.finalPrice : product.price}
                </span>
                <Link to={`/product/${product._id}`}>
                  <button className="text-sm bg-blue-600 hover:bg-blue-700 text-white py-1 px-3 rounded-md transition-colors duration-200">
                    Details
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ProductsByCategory;
