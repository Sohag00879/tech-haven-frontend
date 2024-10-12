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
  console.log(products)
  
  return (
    <>
      <h1 className="text-center text-2xl font-bold mb-5">Related Products</h1>
      <div className="ml-[20rem] mb-5 flex flex-wrap">
        {products?.map((product: TProduct) => (
          <div className="w-[18rem] ml-[2rem] p-3 bg-black text-white" key={product._id}>
            <div className="relative">
              <Link to={`/product/${product._id}`}>
                <img
                  src={product?.image}
                  alt={product?.name}
                  className="h-48 w-full object-cover rounded transition-transform duration-300 ease-in-out transform hover:scale-110"
                />
              </Link>
              <HeartIcon product={product} />
            </div>
            <div className="p-4">
              <Link to={`/product/${product?._id}`}>
                <h2 className="flex justify-between items-center">
                  <Link to={`/product/${product._id}`}>
                    <div>{product?.name}</div>
                  </Link>
                  <span className="bg-pink-100 text-pink-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-pink-900 dark:text-pink-300">
                    ${product.finalPrice ? product.finalPrice : product.price}
                  </span>
                </h2>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ProductsByCategory;
