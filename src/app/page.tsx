"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";
import ItemCard from "@/components/ItemCard";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { setHomeProducts } from "@/lib/store/features/product/homeProductSlice";

type Item = {
  itemId: string;
  title: string;
  sales: number;
  itemUrl: string;
  image: string;
  sku: {
    def: {
      price: number | null;
      promotionPrice: number;
    };
  };
  averageStarRate: number | null;
  type: string;
};

type SellingPoint = {
  name: string;
  id: string;
};

type Product = {
  item: Item;
  delivery: any; // replace 'any' with the appropriate type if known
  sellingPoints: SellingPoint[];
};

type Obj = {
  resultList: Product;
};

export default function Home() {
  const [products, setProducts] = useState<any>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const dispatch = useAppDispatch();
  const homeProducts = useAppSelector((state) => state.homeProducts.data);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const options = {
          method: "GET",
          url: "https://ali-express-clone.onrender.com/api/home/moretolove",
        };
        const response = await axios.request(options);
        dispatch(setHomeProducts(response.data));
      } catch (error) {
        console.log(error);
      }
    };

    getProducts();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <main className="flex flex-col items-center">
      <Image
        width={1500}
        height={200}
        src="/banner.jpg"
        alt="banner"
        className="mt-10"
      />

      <div>
        <h1>More to Love</h1>
        <div className="grid grid-cols-4 gap-4">
          {products.map((product: any, index: number) => (
            <div key={index}>
              <ItemCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
