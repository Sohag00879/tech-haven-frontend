import { useEffect } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { addFavourite, removeFromFavourites, setFavourites } from "../../redux/features/favourite/favouriteSlice";
import { addFavoriteToLocalStorage, getFavoritesFromLocalStorage, removeFavoriteFromLocalStorage } from "../../utils/localStorage";
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

const HeartIcon = ({ product }:{product:TProduct}) => {
  const dispatch = useDispatch();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const favorites = useSelector((state:any) => state.favourites) || [];
  const isFavorite = favorites.some((p:TProduct) => p._id === product?._id);

  useEffect(() => {
    const favoritesFromLocalStorage = getFavoritesFromLocalStorage();
    dispatch(setFavourites(favoritesFromLocalStorage));
  }, []);

  const toggleFavorites = () => {
    if (isFavorite) {
      dispatch(removeFromFavourites(product));
      // remove the product from the localStorage as well
      removeFavoriteFromLocalStorage(product?._id);
    } else {
      dispatch(addFavourite(product));
      // add the product to localStorage as well
      addFavoriteToLocalStorage(product);
    }
  };
  return (
    <div
      className="absolute top-2 right-5 cursor-pointer"
      onClick={toggleFavorites}
    >
      {isFavorite ? (
        <FaHeart className="text-pink-500" />
      ) : (
        <FaRegHeart className="text-white" />
      )}
    </div>
  );
};

export default HeartIcon;