"use client";

import { Menu, Search, ShoppingCart, User } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Input } from "./ui/input";
import HamburgerMenu from "./HamburgerMenu";
import { ProductsCategory } from "@/config.product";

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

const MobileNavbar = () => {
  return (
    <nav className="flex md:hidden flex-col w-full p-2 sticky top-0 left-0 z-50">
      <ul className="flex justify-between p-2">
        <div className="flex gap-2 justify-center items-center">
          <HamburgerMenu />

          <img
            className="w-28"
            alt="logo"
            src="https://ae01.alicdn.com/kf/Sb38c5071993440b8939680d5ebcc081be/1449x315.png"
          />
        </div>
        <div className="flex gap-4 justify-center items-center">
          <button>
            <User className="w-6 h-6" />
          </button>
          <button>
            <ShoppingCart className="w-6 h-6" />
          </button>
        </div>
      </ul>
      <div className="w-full p-2 relative">
        <Input
          className="rounded-full bg-gray-200 px-4"
          placeholder="smart watches for men"
        />
        <Search className="absolute top-[18px] right-5 text-gray-700 w-5 h-5" />
      </div>
    </nav>
  );
};

export default MobileNavbar;
