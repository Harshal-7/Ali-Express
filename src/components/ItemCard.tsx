"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { ProductsCategory } from "@/config.product";
import Link from "next/link";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

const ItemCard = ({ product }: { product: any }) => {
  useEffect(() => {
    // console.log(product);
  }, []);

  return (
    <div className="">
      <Link href="/" className="flex flex-col group">
        <div
          className={cn(
            "relative w-[160px] md:w-[250px] h-[220px] md:h-[300px] overflow-hidden group rounded-md"
          )}
        >
          <img
            src={product.item.image}
            alt={product.item.title}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
          />
        </div>

        <div className="tracking-wider mt-4 mb-1 flex gap-2 items-center">
          <span>{product.item.name}</span>
          <ArrowRight className="h-5 w-5 transition-transform duration-500 scale-0 group-hover:scale-100" />{" "}
        </div>
        <div className="text-xs tracking-widest">
          Rs. {product.ProductPrice}
        </div>
      </Link>
    </div>
  );
};

export default ItemCard;
