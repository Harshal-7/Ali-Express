"use client";

import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  removeAllProductsFromCart,
  removeCartItem,
} from "@/lib/store/features/cart/cartSlice";
import { Minus, Plus, ShoppingCart, Trash } from "lucide-react";
import { getProductInfo } from "@/utils/getProduct";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";

const CartPage = () => {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cartItems.data);
  const [totalCost, setTotalCost] = useState(0);

  const router = useRouter();

  useEffect(() => {
    let cost = 0;
    if (cartItems) {
      cartItems.forEach((item, index) => {
        cost += Number((item.sku.def.promotionPrice * 83).toFixed(2));
      });
    }

    const fetchCartDetails = async () => {
      const response = await axios.get(
        "https://ali-express-clone.onrender.com/api/cart/data",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: document.cookie,
          },
        }
      );

      console.log("response-cart : ", response.data);
    };

    fetchCartDetails();
    setTotalCost(cost);
  });

  const handleRemoveProducts = () => {
    dispatch(removeAllProductsFromCart());
  };

  const handleCartItem = (id: any) => {
    dispatch(removeCartItem(id));
  };

  const handleProductInfo = (id: any) => {
    router.push(`/products/${id}`);
  };

  return (
    <div className="w-full max-w-7xl mx-auto flex justify-center items-start gap-5 mt-10">
      <Card className="w-full max-w-5xl">
        <CardHeader>
          <CardTitle>
            Shopping Cart ({cartItems ? cartItems.length : 0})
          </CardTitle>
          {cartItems && cartItems.length > 0 && (
            <CardDescription className="self-end hover:text-red-500">
              <button onClick={handleRemoveProducts} className="">
                Remove All Products
              </button>
            </CardDescription>
          )}
        </CardHeader>
        <CardContent className="flex flex-col gap-10 mt-10">
          {cartItems && cartItems.length > 0 ? (
            cartItems.map((item, index) => (
              <div key={index} className="flex items-start gap-8 mb-5">
                <div className="w-44 h-44 relative rounded-md flex-shrink-0">
                  <img
                    src={item.image}
                    alt="img"
                    className="w-full h-full object-cover rounded-md"
                  />
                </div>
                <div className="flex flex-col gap-4 flex-1">
                  <button
                    onClick={() => handleProductInfo(item.itemId)}
                    className="text-start"
                  >
                    <div className="line-clamp-2">{item.title}</div>
                  </button>

                  <div className="font-bold">
                    ₹ {(item.sku.def.promotionPrice * 83).toFixed(2)}
                  </div>

                  <div className="flex flex-col gap-2">
                    <p> Quantity</p>
                    <div className="flex gap-4 items-center">
                      <button className="bg-gray-100 rounded-full p-2">
                        <Minus className="w-3 h-3" />
                      </button>
                      <div>1</div>
                      <button className="bg-gray-100 rounded-full p-2">
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
                <button onClick={() => handleCartItem(item.itemId)}>
                  <Trash className="w-6 h-6 hover:text-red-500" />
                </button>
              </div>
            ))
          ) : (
            <div className="flex flex-col justify-center items-center gap-10">
              <ShoppingCart className="w-56 h-56 text-gray-300" />
              <div className="font-bold text-xl">
                No items yet? Continue shopping to explore more.
              </div>
              <Link
                href="/"
                className="px-5 py-3  rounded-3xl bg-red-500 text-white hover:scale-105 hover:bg-red-600 hover:font-bold transition-all duration-300"
              >
                Explore More Items
              </Link>
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Summary</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-10 mt-10">
          <div className="flex justify-between font-bold">
            <div>Total</div>
            <div>₹ {totalCost}</div>
          </div>
          <button className="w-full px-5 py-3 rounded-3xl bg-red-500 text-white font-bold hover:font-extrabold transition-all duration-300">
            Checkout ({cartItems ? cartItems.length : 0})
          </button>
        </CardContent>
      </Card>
    </div>
  );
};

export default CartPage;
