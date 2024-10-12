
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

// Add a product to a localStorage
export const addFavoriteToLocalStorage = (product:IProduct) => {
    const favorites = getFavoritesFromLocalStorage();
    if (!favorites.some((p:IProduct) => p._id === product._id)) {
      favorites.push(product);
      localStorage.setItem("favorites", JSON.stringify(favorites));
    }
  };
  
  // Remove  product from a localStorage
  export const removeFavoriteFromLocalStorage = (productId:IProduct) => {
    const favorites = getFavoritesFromLocalStorage();
    const updateFavorites = favorites.filter(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (product:any) => product._id !== productId
    );
  
    localStorage.setItem("favorites", JSON.stringify(updateFavorites));
  };
  
  // Retrive favorites from a localStorage
  export const getFavoritesFromLocalStorage = () => {
    const favoritesJSON = localStorage.getItem("favorites");
    return favoritesJSON ? JSON.parse(favoritesJSON) : [];
  };
  