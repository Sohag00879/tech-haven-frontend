import { useSelector } from "react-redux";

const FavoritesCount = () => {
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const favorites = useSelector((state: any) => state.favourites);
  const favoriteCount = favorites?.length;

  return (
    <div className="absolute left-2 top-8">
      {favoriteCount > 0 && (
        <span className="px-1 py-0 text-sm text-white bg-pink-500 rounded-full">
          {favoriteCount}
        </span>
      )}
    </div>
  );
};

export default FavoritesCount;



