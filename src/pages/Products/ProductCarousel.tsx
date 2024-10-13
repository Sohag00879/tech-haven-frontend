import Message from "../../components/Message";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useGetTopProductQuery } from "../../redux/features/admin/products/getTopProductApi";
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
  finalPrice: string;
  __v: number;
}

const ProductCarousel = () => {
  const { data: products, isLoading, error } = useGetTopProductQuery();

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="mb-4 lg:block xl:block md:block mt-10">
      {isLoading ? null : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <Slider
          {...settings}
          className="xl:w-full lg:w-full md:w-[40rem] sm:w-[30rem] w-full px-8"
        >
          {products?.slice(0, 8).map((product: IProduct) => (
            <div key={product._id} className="px-4"> 
              <div className=" bg-slate-200 px-4 py-4 flex rounded-lg drop-shadow overflow-hidden w-full transform transition-transform border-gray-200 border items-center">
              <HeartIcon product={product} />
              <Link to={`/product/${product._id}`}>
              <img
                  className="aspect-square h-20 md:h-40 object-cover rounded-lg transition-transform duration-300 ease-in-out transform hover:scale-110"
                  src={product.image}
                  alt="product image"
                />
              </Link>
                <div className="p-2 md:p-6 h-full flex flex-col md:justify-between">
                  <Link to={`/product/${product._id}`}>
                  <h3 className="text-sm md:text-md font-bold md:mb-2 uppercase text-gray-700 leading-4">
                    {product.name}
                  </h3>
                  </Link>
                  <p className="pb-0 md:pb-4">
                    <span className="text-lg md:text-3xl font-bold text-slate-900">
                      $ {product.finalPrice ? product.finalPrice : product.price}
                    </span>
                    {product.finalPrice && (
                      <span className="text-xs md:text-sm text-slate-900 line-through">
                        $ {product.price}
                      </span>
                    )}
                  </p>

                  <Link to={`/product/${product._id}`}
                    className="flex items-center justify-center rounded-md bg-slate-900 px-5 py-2.5 text-center text-xs md:text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="mr-2 w-4 md:w-6 aspect-square"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                   Buy Now
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
};

export default ProductCarousel;