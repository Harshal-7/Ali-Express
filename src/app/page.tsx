"use client";

import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";
import { ProductsCategory } from "@/config.product";
import MobileNavbar from "@/components/MobileNavbar";

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

export default function Home() {
  const [data, setData] = useState<ProductCategory[]>([]);

  useEffect(() => {
    // axios
    //   .get("https://ali-express-clone.onrender.com/api/category")
    //   .then(function (response) {
    //     console.log(response.data.result.resultList);
    //     setData(response.data.result.resultList);
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });

    // console.log(productsCategory);
    setData(productsCategory);
  }, []);

  return (
    <main className="flex flex-col items-center">
      <Image
        width={1500}
        height={200}
        src="/banner.jpg"
        alt="banner"
        className="mt-10"
      />
    </main>
  );
}
