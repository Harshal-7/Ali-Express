"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ArrowRight, ShoppingCart } from "lucide-react";

const ItemCard = ({ product }: { product: any }) => {
  const handleCartButton = (item: any) => {
    console.log("MY ITEM : ", item);
  };

  useEffect(() => {
    // console.log(product);
  }, []);

  return (
    <div
      key={product.item.key}
      className="flex flex-col group hover:border hover:shadow-md relative w-[140px] md:w-[250px] h-[200px] md:h-[350px] overflow-hidden group rounded-lg"
    >
      <div
        key={product.item.key}
        className="relative w-[140px] md:w-[250px] h-[200px] md:h-[350px] overflow-hidden group rounded-lg"
      >
        <Link href={`/products/${product.item.itemId}`}>
          <img
            src={product.item.image}
            alt="img"
            className="w-full h-full object-cover transition-transform duration-300 "
          />
        </Link>
      </div>

      <div
        key={product.item.key}
        className="tracking-wider mt-4 mb-1 flex gap-2 items-center pl-2"
      >
        <Link
          href={`/products/${product.item.itemId}`}
          className="text-sm line-clamp-2"
        >
          {product.item.title}
        </Link>
      </div>
      <div
        key={product.item.key}
        className="text-xs tracking-widest font-bold pl-2 mb-5 mt-2 flex justify-between items-center"
      >
        <div>
          <span> Rs. </span>
          <span className="text-xl">
            {(product.item.sku.def.promotionPrice * 83).toFixed(2)}
          </span>
        </div>
        <button onClick={() => handleCartButton(product.item)}>
          <ShoppingCart className="w-12 h-12 absolute bottom-2 right-2 bg-white p-3 rounded-full hover:bg-black hover:text-white" />
        </button>
      </div>
    </div>
  );
};

export default ItemCard;
