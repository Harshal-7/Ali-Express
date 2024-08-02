"use client";

import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";
import { ProductsCategory } from "@/config.product";
import MobileNavbar from "@/components/MobileNavbar";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

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
  const [productData, setProductData] = useState<ProductCategory[]>([]);
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    console.log("STATUS : ", status);
    console.log("SESSION : ", session);
  }, [status, session]);

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
    setProductData(productsCategory);
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
