"use client";

import { Copy, Menu, Search, ShoppingCart, User } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Input } from "./ui/input";
import HamburgerMenu from "./HamburgerMenu";
import { useRouter } from "next/navigation";
import { getProductsList } from "@/utils/getProduct";
import { setProducts } from "@/lib/store/features/product/productSlice";
import { useAppDispatch } from "@/lib/store/hooks";
import Link from "next/link";
import { HamburberCategory } from "@/config.product";
import Cookies from "js-cookie";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Label } from "./ui/label";

const MobileNavbar = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [searchInput, setSearchInput] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = Cookies.get("UserAuth");
    setIsAuthenticated(!!token);
  }, []);

  const handleSignOut = () => {
    Cookies.remove("UserAuth");

    if (!Cookies.get("UserAuth")) {
      setIsAuthenticated(false);
      router.replace("/");
    }
  };

  const handleSearchChange = (e: any) => {
    setSearchInput(e.target.value);
  };

  const handleSearch = async () => {
    const response = await getProductsList(searchInput);
    dispatch(setProducts(response?.data));
    setSearchInput("");
    router.push(`/search/${searchInput}`);
  };

  return (
    <nav className="flex md:hidden flex-col w-full p-2 sticky top-0 left-0 z-50 bg-background">
      <ul className="flex justify-between p-2">
        <div className="flex gap-2 justify-center items-center">
          <HamburgerMenu />

          <Link href="/">
            <img
              className="w-28"
              alt="logo"
              src="https://ae01.alicdn.com/kf/Sb38c5071993440b8939680d5ebcc081be/1449x315.png"
            />
          </Link>
        </div>
        <div className="flex gap-4 justify-center items-center">
          {isAuthenticated ? (
            <Dialog>
              <DialogTrigger asChild>
                <User className="w-6 h-6 cursor-pointer" />
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Sign Out</DialogTitle>
                  <DialogDescription className="">
                    You will we returned to login screen
                  </DialogDescription>
                </DialogHeader>
                <div className="flex gap-4">
                  <DialogClose className="w-full rounded-3xl" asChild>
                    <Button type="button" variant="secondary">
                      Close
                    </Button>
                  </DialogClose>
                  <Button
                    onClick={() => handleSignOut()}
                    variant="myBtn"
                    className="w-full rounded-3xl"
                  >
                    Sign Out
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          ) : (
            <Link href="/login">
              <User className="w-6 h-6" />
            </Link>
          )}
          <Link href="/cart">
            <ShoppingCart className="w-6 h-6" />
          </Link>
        </div>
      </ul>
      <div className="w-full p-2 relative">
        <Input
          className="rounded-full bg-gray-200 text-black px-4"
          placeholder="smart watches for men"
          onChange={handleSearchChange}
        />
        <button onClick={handleSearch}>
          <Search className="absolute top-[18px] right-5 text-gray-700 w-5 h-5" />
        </button>
      </div>
    </nav>
  );
};

export default MobileNavbar;