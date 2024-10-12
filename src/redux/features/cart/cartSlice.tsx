import { createSlice } from "@reduxjs/toolkit";
import { updateCart } from "../../../utils/cartUtils";


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


const cartFromStorage = localStorage.getItem("cart");

const initialState = cartFromStorage
  ? JSON.parse(cartFromStorage)
  : { cartItems: [], shippingAddress: {}, paymentMethod: "PayPal" };


const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { ...item } = action.payload;
      const existItem = state.cartItems.find((x:TProduct) => x._id === item._id);

      if (existItem) {
        state.cartItems = state.cartItems.map((x:TProduct) =>
          x._id === existItem._id ? item : x
        );
      } else {
        // state.cartItems = [...state.cartItems, item];
        state.cartItems = [...state.cartItems, action.payload];
      }
      // return updateCart(state, item);
      // return updateCart(state, action.payload);
      return updateCart(state);
    },

    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter((x:TProduct) => x._id !== action.payload);
      return updateCart(state);
    },

    saveShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
      localStorage.setItem("cart", JSON.stringify(state));
    },

    savePaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
      localStorage.setItem("cart", JSON.stringify(state));
    },

    clearCartItems: (state) => {
      state.cartItems = [];
      localStorage.setItem("cart", JSON.stringify(state));
    },

    // resetCart: (state) => (state = initialState),
  },
});

export const {
  addToCart,
  removeFromCart,
  savePaymentMethod,
  saveShippingAddress,
  clearCartItems,
  // resetCart,
} = cartSlice.actions;

export default cartSlice.reducer;