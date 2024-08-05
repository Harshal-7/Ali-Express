"use client";

import Image from "next/image";
import { Suspense, useEffect, useState } from "react";
import axios from "axios";
import ItemCard from "@/components/ItemCard";
import LoadingPage from "./loading";

export default function Home() {
  const [products, setProducts] = useState<any>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const options = {
          method: "GET",
          url: "https://ali-express-clone.onrender.com/api/home/moretolove",
        };
        const response = await axios.request(options);
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.log("Error while fetching home-products", error);
      }
    };

    getProducts();
  }, []);

  return (
    <Suspense fallback={<LoadingPage />}>
      <main className="flex flex-col items-center">
        <Image
          width={1500}
          height={200}
          src="/banner.jpg"
          alt="banner"
          className="mt-10 hidden md:block"
        />

        <div className="w-full max-w-screen-2xl">
          <h1 className=" md:mt-14 mb-2 md:mb-5 font-bold md:text-2xl text-center">
            More to Love
          </h1>
          <div className="flex flex-wrap gap-y-5 gap-x-2 md:gap-10 justify-center">
            {products &&
              products.map((product: any, index: number) => (
                <div key={index}>
                  <ItemCard product={product} />
                </div>
              ))}
          </div>
        </div>
      </main>
    </Suspense>
  );
}
