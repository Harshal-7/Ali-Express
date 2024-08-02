import { configureStore } from "@reduxjs/toolkit";
import productReducer from "@/lib/store/features/product/productSlice";
import cartReducer from "@/lib/store/features/cart/cartSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      products: productReducer,
      cartItems: cartReducer,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
