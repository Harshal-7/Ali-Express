"use client";

import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import ItemCard from "@/components/ItemCard";
import { ProductsCategory } from "@/config.product";
import { useAppSelector } from "@/lib/store/hooks";
import Image from "next/image";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { ArrowRight, ChevronsUpDown, ShoppingCart } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const ProductList = ({ params }: { params: { name: String } }) => {
  const [name, setName] = useState("");
  const products = useAppSelector((state) => state.products.data);

  useEffect(() => {
    setName(params.name as string);
  }, []);

  if (!products) {
    return <div>No products found</div>;
  }

  return (
    <div className="w-full max-w-screen-xl mx-auto mt-10">
      <div className="hidden md:flex justify-end gap-2 items-center mr-20">
        <p>Sort by:</p>
        <div className=" flex justify-center items-center gap-5 border rounded-3xl px-4 py-2">
          <button className="">Best Match</button>
          <Separator className="h-6" orientation="vertical" />
          <button className="">Orders</button>
          <Separator className="h-6" orientation="vertical" />
          <button className="flex justify-center items-center">
            <span>Prices</span>
            <ChevronsUpDown className="w-4 h-4 ml-2" />
          </button>
        </div>
      </div>

      <div className="w-full max-w-screen-xl flex flex-wrap justify-center md:grid md:grid-cols-4 gap-2 md:gap-5 mt-10">
        {products.map((product, index: number) => (
          <div key={index}>
            <ItemCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
