"use client";

import React, { useEffect, useState } from "react";
import ItemCard from "@/components/ItemCard";
import { useAppSelector } from "@/lib/store/hooks";

import { ChevronsUpDown } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const ProductList = ({ params }: { params: { name: String } }) => {
  // FETCHING PRODUCTS FROM REDUX-STORE WHICH WERE SAVED FROM DROPDOWN-SUB-CATEGORY
  const products = useAppSelector((state) => state.products.data);
  const cartItems = useAppSelector((state) => state.cartItems.data);

  if (!products) {
    return <div>No products found</div>;
  }

  return (
    <div className="w-full max-w-screen-xl mx-auto mt-10">
      <div className="hidden md:flex justify-end gap-2 items-center text-sm">
        <p>Sort by:</p>
        <div className="flex justify-center items-center gap-5 border rounded-3xl px-4 py-2">
          <button className="">Best Match</button>
          <Separator className="h-6" orientation="vertical" />
          <button className="">Orders</button>
          <Separator className="h-6" orientation="vertical" />
          <button className="flex justify-center items-center">
            <span>Prices</span>
            <ChevronsUpDown className="w-4 h-4 ml-2" />
          </button>
        </div>
      </div>

      <div className="w-full max-w-screen-xl flex flex-wrap gap-5 justify-center md:grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 md:gap-4 mt-5">
        {products.map((product, index: number) => (
          <div key={index}>
            <ItemCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
