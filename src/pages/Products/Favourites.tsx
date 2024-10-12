import { useSelector } from "react-redux";
import Product from "./Product";
import { selectFavouriteProduct } from "../../redux/features/favourite/favouriteSlice";

type TProduct = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    _id: string | any;
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

const Favorites = () => {
  const favorites = useSelector(selectFavouriteProduct);

  return (
    <div className="ml-[10rem]">
      <h1 className="text-lg font-bold ml-[3rem] mt-[3rem]">
        {favorites?.length === 0 ? 'NO FAVORITE PRODUCTS':'FAVORITE PRODUCTS'}
      </h1>

      <div className="flex flex-wrap">
        {favorites.map((product:TProduct) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Favorites;