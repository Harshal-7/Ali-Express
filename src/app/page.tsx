"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";
import ItemCard from "@/components/ItemCard";

export default function Home() {
  const [products, setProducts] = useState<any>();

  useEffect(() => {
    const getProducts = async () => {
      try {
        const options = {
          method: "GET",
          url: "https://ali-express-clone.onrender.com/api/home/moretolove",
        };
        const response = await axios.request(options);
        setProducts(response.data); 
      } catch (error) {
        console.log("Error while fetching home-products", error);
      }
    };

    getProducts();
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

      <div className="w-full max-w-screen-2xl">
        <h1 className="mt-14 mb-5 font-bold text-2xl text-center md:text-start">
          More to Love
        </h1>
        <div className="flex flex-wrap gap-5 md:gap-10 justify-center md:justify-start">
          {products &&
            products.map((product: any, index: number) => (
              <div key={index}>
                <ItemCard product={product} />
              </div>
            ))}
        </div>
      </div>
    </main>
  );
}
