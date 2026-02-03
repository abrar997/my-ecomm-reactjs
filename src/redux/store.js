import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "./slice/authSlice";
import cartReducer from "./slice/cartSlice";
import productReducer from "./slice/productSlice";
import WhishListReducer from "./slice/whishlistSlice";
const rootReducer = combineReducers({
  auth: authReducer,
  cart: cartReducer,
  products: productReducer,
  WhishList: WhishListReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
