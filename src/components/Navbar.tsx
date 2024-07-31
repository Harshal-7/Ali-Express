"use client";

import {
  ChevronDown,
  Heart,
  Menu,
  NotepadText,
  Search,
  ShoppingCart,
  User,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { Input } from "./ui/input";
import HamburgerMenu from "./HamburgerMenu";
import { ProductsCategory } from "@/config.product";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import SignInButton from "./SignInButton";
import { MyDropdownMenu } from "./MyDropdownMenu";
import Link from "next/link";

// Define the types for the product category and product items
type ProductItem = {
  name: string | null;
  id: number;
};

type ProductCategory = {
  name: string;
  id: number;
  list: ProductItem[];
};

const productsCategory: ProductCategory[] = ProductsCategory;

const Navbar = () => {
  const [data, setData] = useState<ProductCategory[]>([]);

  useEffect(() => {
    // console.log(productsCategory);
    setData(productsCategory);
  }, []);

  return (
    <nav className="w-full hidden md:flex flex-col justify-center items-center p-2 sticky top-0 left-0 z-50 bg-[#191919] text-background">
      <ul className="flex gap-2 p-2 w-full max-w-screen-xl justify-center">
        <div className="flex gap-2 justify-center items-center">
          <Link href="/">
            <img
              className="w-48"
              alt="logo"
              src="https://ae01.alicdn.com/kf/Sb38c5071993440b8939680d5ebcc081be/1449x315.png"
            />
          </Link>
          <MyDropdownMenu />
        </div>
        <div className="w-1/3 p-2 relative">
          <Input
            className="rounded-full bg-gray-200 px-4"
            placeholder="smart watches for men"
          />
          <Search className="absolute top-[18px] right-5 text-gray-700 w-5 h-5" />
        </div>

        <div className="flex gap-2 justify-center items-center">
          <HoverCard openDelay={300} closeDelay={300}>
            <HoverCardTrigger asChild>
              <button className="flex gap-2 justify-center items-center">
                <User className="w-8 h-8" />
                <div className="flex flex-col text-start flex-wrap">
                  <p className="text-sm ">Welcome</p>
                  <div className="text-xs flex items-center gap-1">
                    <p className="text-ellipsis" >SignIn / Register</p>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </div>
              </button>
            </HoverCardTrigger>
            <HoverCardContent className="w-80 rounded-3xl p-4">
              <div className="w-full flex flex-col items-center justify-center gap-5 mt-2">
                <SignInButton />

                <Button
                  variant="secondary"
                  className="w-full rounded-full text-xl py-6"
                >
                  Register
                </Button>

                <Separator />

                <div className="w-full flex flex-col gap-2 items-start">
                  <button className="flex gap-2 items-center w-full px-4 py-2 rounded-md hover:bg-gray-100 hover:text-red-500 group">
                    <NotepadText className="w-4 h-4 group-hover:text-foreground" />
                    <p>My Order</p>
                  </button>
                  <button className="flex gap-2 items-center w-full px-4 py-2 rounded-md hover:bg-gray-100 hover:text-red-500 group">
                    <Heart className="w-4 h-4 group-hover:text-foreground" />
                    <p>Wish List</p>
                  </button>
                </div>
              </div>
            </HoverCardContent>
          </HoverCard>
          <button></button>
          <Link href="/cart" className="flex gap-2 justify-center items-center">
            <ShoppingCart className="w-6 h-6" />
            <p className="flex flex-col text-start">Cart</p>
          </Link>
        </div>
      </ul>
      {/* <MyDropdownMenu /> */}
    </nav>
  );
};

export default Navbar;
