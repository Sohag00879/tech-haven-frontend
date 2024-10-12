import { configureStore } from '@reduxjs/toolkit'
import { baseApi } from './api/baseApi'
import storage from "redux-persist/lib/storage";
import authReducer from './features/auth/authSlice'
import {
  persistStore, 
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import { getFavoritesFromLocalStorage } from '../utils/localStorage';
import favouriteReducer from './features/favourite/favouriteSlice';
import cartReducer from './features/cart/cartSlice';
import shopReducer from './features/shop/shopSlice';


const persistConfig = {
  key: "teach-user",
  storage,
};

const persistedAuthReducer = persistReducer(persistConfig, authReducer);
const initialFavourites = getFavoritesFromLocalStorage() || []

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath] : baseApi.reducer,
    auth: persistedAuthReducer,
    favourites: favouriteReducer,
    cartItems:cartReducer,
    shop:shopReducer
  },

  preloadedState:{
    favourites:initialFavourites
  },

  middleware : getDefaultMiddlewares => getDefaultMiddlewares({
    serializableCheck:{
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
  }

  }).concat(baseApi.middleware)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const persistor = persistStore(store);