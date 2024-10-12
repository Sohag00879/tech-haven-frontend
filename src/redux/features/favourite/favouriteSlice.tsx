import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
    countInStock: number;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    reviews: any[];
    createdAt: string;
    updatedAt: string;
    __v: number;
  }


  const favouriteSlice = createSlice({
    name: 'favourites',
    initialState: [] as TProduct[],
    reducers: {
      addFavourite: (state, action: PayloadAction<TProduct>) => {
        if (!state.some((product) => product._id === action.payload._id)) {
          state.push(action.payload);
        }
      },
      removeFromFavourites : (state,action)=>{
        //Remove the product with the matching ID
        return state.filter((product)=>product._id !==action.payload._id)
      },
      setFavourites : (state,action)=>{
        return action.payload
      }
    }
  });

  export const {addFavourite,removeFromFavourites,setFavourites} = favouriteSlice.actions;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  export const selectFavouriteProduct = (state:any)=>state.favourites;
  export default favouriteSlice.reducer;