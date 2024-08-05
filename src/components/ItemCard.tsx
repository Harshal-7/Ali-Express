"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ArrowRight, ShoppingCart } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/store/store";
import {
  setAuthState,
  selectAuthState,
} from "@/lib/store/features/auth/authSlice";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useToast } from "./ui/use-toast";

const ItemCard = ({ product }: { product: any }) => {
  const dispatch: AppDispatch = useDispatch();
  const isAuthenticated = useSelector((state: RootState) =>
    selectAuthState(state)
  );
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    const token = Cookies.get("UserAuth");
    dispatch(setAuthState(!!token)); // Update Redux state based on cookie presence
  }, [dispatch]);

  // Add product to cart
  const handleAddToCart = async (item: any) => {
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }
    try {
      await axios.post(
        "https://ali-express-clone.onrender.com/api/cart/add",
        {
          productId: `${item.itemId}`,
          title: `${item.title}`,
          price: (item.sku.def.promotionPrice * 83).toFixed(2),
          image: `${item.image}`,
          quantity: 1,
          size: "m",
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: document.cookie,
          },
        }
      );
      toast({
        title: "Item added to cart",
        className: "text-red-600 bg-white hover:bg-gray-100 font-bold",
      });
    } catch (error) {
      console.log("ERROR adding to cart : ", error);
    }
  };

  return (
    <div
      key={product.item.key}
      className="flex flex-col gap-2 md:gap-0 group hover:border hover:shadow-lg relative w-[180px] md:w-[250px] h-[260px] md:h-[350px] overflow-hidden group rounded-lg"
    >
      <div
        key={product.item.key}
        className="relative w-[180px] md:w-[250px] h-[260px] md:h-[350px] overflow-hidden group rounded-lg"
      >
        <Link href={`/products/${product.item.itemId}`}>
          <img
            src={product.item.image}
            alt="img"
            className="w-full h-full object-cover transition-transform duration-300 border rounded-lg"
          />
        </Link>
      </div>

      <div
        key={product.item.key}
        className="hidden md:flex tracking-wider mt-4 mb-1 gap-2 items-center pl-2"
      >
        <Link
          href={`/products/${product.item.itemId}`}
          className="text-sm line-clamp-1 md:line-clamp-2"
        >
          {product.item.title}
        </Link>
      </div>
      <div
        key={product.item.key}
        className="hidden md:flex text-xs tracking-widest font-bold pl-2 mb-5 mt-2 justify-between items-center"
      >
        <div>
          <span> ₹ </span>
          <span className="md:text-xl">
            {(product.item.sku.def.promotionPrice * 83).toFixed(2)}
          </span>
        </div>
        <button onClick={() => handleAddToCart(product.item)}>
          <ShoppingCart className="w-5 sm:w-12 h-10 sm:h-12 absolute bottom-2 right-2 bg-white sm:p-3 rounded-full sm:hover:bg-black sm:hover:text-white align-middle" />
        </button>
      </div>

      <Link
        href={`/products/${product.item.itemId}`}
        key={product.item.key}
        className="flex md:hidden text-xl tracking-wide pl-2 justify-start items-center gap-1"
      >
        <p className="text-base"> ₹ </p>
        <div className="md:text-xl">
          {(product.item.sku.def.promotionPrice * 83).toFixed(2)}
        </div>
      </Link>

      <Link
        href={`/products/${product.item.itemId}`}
        key={product.item.key}
        className="flex md:hidden tracking-tight gap-2 pl-2"
      >
        <p className="text-xs line-clamp-1">{product.item.title}</p>
      </Link>
    </div>
  );
};

export default ItemCard;
