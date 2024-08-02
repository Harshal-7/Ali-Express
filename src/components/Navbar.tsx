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
import React, { use, useEffect, useState } from "react";
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
import { MyDropdownMenu } from "./MyDropdownMenu";
import Link from "next/link";
import { getProductsList } from "@/utils/getProduct";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { useRouter } from "next/navigation";
import { setProducts } from "@/lib/store/features/product/productSlice";
import { signOut, useSession } from "next-auth/react";

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
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cartItems.data);

  const router = useRouter();
  const { data: session, status } = useSession();

  const [data, setData] = useState<ProductCategory[]>([]);
  const [searchInput, setSearchInput] = useState("");

  // Set product-categoty data to state
  useEffect(() => {
    setData(productsCategory);
  }, []);

  // Refresh token for auth
  useEffect(() => {
    router.refresh();
  }, [status, session]);

  // Store searchbar value in state
  const handleSearchChange = (e: any) => {
    setSearchInput(e.target.value);
  };

  // Get Product List by serching the name of product
  const handleSearch = async () => {
    const response = await getProductsList(searchInput);
    dispatch(setProducts(response?.data));
    setSearchInput("");
    router.push(`/search/${searchInput}`);
  };

  const handleLogOut = () => {
    signOut();
  };

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
        <div className="w-1/3 p-2 relative flex justify-center items-center">
          <Input
            className="rounded-full bg-gray-200 text-black px-4"
            placeholder="smart watches for men"
            onChange={handleSearchChange}
          />
          <button onClick={handleSearch}>
            <Search className="absolute top-[18px] right-5 text-gray-700 w-5 h-5" />
          </button>
        </div>

        <div className="flex gap-2 justify-center items-center">
          <HoverCard openDelay={300} closeDelay={300}>
            <HoverCardTrigger asChild>
              <button className="flex gap-2 justify-center items-center">
                <User className="w-8 h-8" />
                {status !== "authenticated" ? (
                  <div className="flex flex-col text-start flex-wrap">
                    <p className="text-sm ">Welcome</p>
                    <div className="text-xs flex items-center gap-1">
                      <p className="">Sign In / Register</p>
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col text-start flex-wrap pr-2">
                    <p className="text-sm line-clamp-1">
                      Hi, {session.user?.name}
                    </p>
                    <div className="text-xs flex items-center gap-1">
                      <p className="">Account</p>
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </div>
                )}
              </button>
            </HoverCardTrigger>
            <HoverCardContent className="w-80 rounded-3xl p-4">
              <div className="w-full flex flex-col items-center justify-center gap-5 mt-2">
                {status !== "authenticated" ? (
                  <>
                    <Link href="/login" className="w-full rounded-full">
                      <Button
                        variant="default"
                        className="w-full rounded-full text-xl py-6"
                      >
                        Sign In
                      </Button>
                    </Link>

                    <Link href="/register" className="w-full rounded-full">
                      <Button
                        variant="secondary"
                        className="w-full rounded-full text-xl py-6"
                      >
                        Register
                      </Button>
                    </Link>
                  </>
                ) : (
                  <Button
                    variant="default"
                    className="w-full rounded-full text-xl py-6"
                    onClick={handleLogOut}
                  >
                    Sign Out
                  </Button>
                )}

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
          <Link
            href="/cart"
            className="flex gap-2 justify-center items-center relative "
          >
            <ShoppingCart className="w-6 h-6" />
            {cartItems ? (
              <div className="flex flex-col">
                <p className=" text-xs bg-white text-black rounded-full text-center">
                  {cartItems.length}
                </p>
                <p className="flex flex-col text-start text-sm">Cart</p>
              </div>
            ) : (
              <div className="flex flex-col">
                <p className=" text-xs bg-white text-black rounded-full text-center">
                  0
                </p>
                <p className="flex flex-col text-start text-sm">Cart</p>
              </div>
            )}
          </Link>
        </div>
      </ul>
      {/* <MyDropdownMenu /> */}
    </nav>
  );
};

export default Navbar;
