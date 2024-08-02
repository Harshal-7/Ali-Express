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
import { getProductInfo } from "@/utils/getProduct";

type ProductProperty = {
  name: string;
  value: string;
};

type SKUItem = {
  skuId: string;
  propMap: string;
  price: number;
  promotionPrice: number;
  quantity: number;
  ext: string;
};

type SKUPropValue = {
  vid: number;
  name: string;
  image?: string;
  propTips?: string;
};

type SKUProp = {
  pid: number;
  name: string;
  values: SKUPropValue[];
};

type ProductInterface = {
  available: boolean;
  itemId: string;
  title: string;
  catId: number;
  sales: string;
  wishCount: number;
  itemUrl: string;
  images: string[];
  video: string | null;
  properties: {
    cut: string;
    list: ProductProperty[];
  };
  description: {
    html: string;
    images: string[];
  };
  sku: {
    def: {
      quantity: number;
      price: number;
      promotionPrice: number;
      vat: {
        desc: string;
      };
      unit: string;
      isBulk: boolean;
    };
    base: SKUItem[];
    props: SKUProp[];
    skuImages: Record<string, string>;
  };
};

const ProductDescription = ({ params }: { params: { id: Number } }) => {
  const [product, setProduct] = useState<ProductInterface>();

  const handleProductInfo = async (productId: any) => {
    const response = await getProductInfo(productId);
    setProduct(response?.data?.result?.item);
    console.log("PRODUCT DESCRIPTION : ", response?.data?.result);
  };

  useEffect(() => {
    const productId = Number(params.id);
    handleProductInfo(productId);
  }, []);

  if (!product) {
    return <div>...</div>;
  }

  return (
    <div className="w-full max-w-screen-xl mx-auto mt-10">
      <div className="flex flex-wrap ">
        <div className="flex gap-4">
          <img
            src={product.images[0]}
            alt="img"
            className="w-[500px] rounded-md"
          />
          <div className="flex flex-col gap-5">
            <div className="font-bold text-xl mt-2">{product.title}</div>
            <div className="font-bold text-xl mt-2">
              ₹ {(product.sku.base[0].price * 83).toFixed(2)}
            </div>
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default ProductDescription;
