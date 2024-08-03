"use client";

import { Menu, Search, ShoppingCart, User } from "lucide-react";
import React, { useState } from "react";
import { Input } from "./ui/input";
import HamburgerMenu from "./HamburgerMenu";
import { useRouter } from "next/navigation";
import { getProductsList } from "@/utils/getProduct";
import { setProducts } from "@/lib/store/features/product/productSlice";
import { useAppDispatch } from "@/lib/store/hooks";

const MobileNavbar = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [searchInput, setSearchInput] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if the user is authenticated by checking the cookie
  React.useEffect(() => {
    if (typeof document !== "undefined" && document.cookie.includes("UserAuth")) {
      setIsAuthenticated(true);
    }
  }, []);

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
