"use client";

import React, { ReactNode } from "react";
import { useRef } from "react";
import { Provider } from "react-redux";
import { makeStore, AppStore } from "@/lib/store/store";
import { setProducts } from "@/lib/store/features/product/productSlice";

const StoreProvider = ({ children }: { children: ReactNode }) => {
  const storeRef = useRef<AppStore>();
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore();
    // storeRef.current.dispatch(setProducts([{ id: 1 }]));
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
};

export default StoreProvider;
