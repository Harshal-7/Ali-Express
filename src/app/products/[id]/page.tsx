"use client";

import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import ItemCard from "@/components/ItemCard";
import { myProduct, Product, ProductsCategory } from "@/config.product";
import { useAppSelector } from "@/lib/store/hooks";
import Image from "next/image";
import { cn } from "@/lib/utils";
import Link from "next/link";
import {
  ArrowRight,
  ChevronsUpDown,
  Heart,
  Lock,
  Minus,
  Plus,
  Share2,
  ShoppingCart,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { getProductInfo } from "@/utils/getProduct";
import { ProductImageCarousel } from "@/components/ProductImageCarousel";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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

type CartProps = {
  productId: string;
  title: string;
  price: number;
  image: string;
  quantity: number;
  size: number;
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
  video: {
    id: number;
    thumbnail: string;
    url: string;
  };
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
  const [quantity, setQuantity] = useState(1);
  const [cartObject, setCartObject] = useState<any>();

  useEffect(() => {
    const itemId = Number(params.id);
    handleProductInfo(itemId);
  }, []);

  // API call to fetch product details
  const handleProductInfo = async (itemId: any) => {
    const response = await axios.get(
      `https://ali-express-clone.onrender.com/api/product/${itemId}`
    );

    setProduct(response?.data?.item);
    setCartObject({ productId: product?.itemId });
    console.log("PRODUCT DESCRIPTION : ", response?.data?.item);
  };

  const handleCart = () => {};

  if (!product) {
    return <div>...</div>;
  }

  return (
    <div className="w-full flex flex-col max-w-screen-2xl mx-auto mt-10">
      {/* TOP COMPONENT  */}
      <div className="w-full flex flex-col md:flex-row items-center md:items-start md:gap-2">
        <div className="flex flex-wrap w-full md:w-3/4">
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center md:items-start">
            {/* Carousel for product images  */}
            <Carousel
              opts={{
                loop: true,
              }}
              className="w-full max-w-md group"
            >
              <CarouselContent>
                {product.images.map((item, index) => (
                  <CarouselItem key={index}>
                    <div className="p-1">
                      <Card className="border-none shadow-none rounded-xl">
                        <CardContent className="flex items-center justify-center p-2 overflow-hidden">
                          <img
                            src={item}
                            alt="img"
                            className="w-full h-full object-cover rounded-xl hover:scale-110 transition-transform duration-300"
                          />
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden md:inline-flex opacity-60 group-hover:opacity-100 transition-all duration-300 h-10 w-10 bg-gray-200" />
              <CarouselNext className="hidden md:inline-flex opacity-60 group-hover:opacity-100 transition-all duration-300 h-10 w-10 bg-gray-200" />
            </Carousel>

            <div className="flex flex-col gap-5 px-6 md:px-2">
              <div className="font-bold text-xl md:text-4xl mt-2">
                ₹ {(product.sku.base[0].price * 83).toFixed(2)}
              </div>

              <div className="font-bold text-sm md:text-xl">
                {product.title}
              </div>
              <div className="text-xs">{product.sales} items sold</div>

              <div className="flex flex-col gap-5">
                <hr />
                <div className="font-semibold">{product.sku.props[0].name}</div>
                <div className="w-full flex flex-wrap relative gap-4">
                  {product.sku.props[0].values.map((item, index) => (
                    <div
                      key={index}
                      className="w-20 h-20 rounded-md cursor-pointer"
                    >
                      <img
                        src={item.image}
                        alt=""
                        className="w-full h-full rounded-md"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CART COMPONENT  */}
        <div className="w-full p-4 md:p-0 md:w-1/4">
          <Card className="">
            <CardContent className="mt-4 flex flex-col gap-4 w-full text-sm">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-1 font-bold">
                  <Lock className="w-3 h-3" />
                  <div>Security & Privacy</div>
                </div>
                <div className="text-xs text-muted-foreground">
                  Safe payments: We do not share your personal details with any
                  third parties without your consent. <br /> Secure personal
                  details: We protect your privacy and keep your personal
                  details safe and secure.
                </div>
              </div>

              <hr />

              <div className="flex flex-col gap-2 items-center md:items-start">
                <p className="font-bold"> Quantity</p>
                <div className="flex gap-4 items-center">
                  <button
                    onClick={() =>
                      setQuantity((prev) => {
                        if (prev <= 1) {
                          return prev;
                        }
                        return (prev -= 1);
                      })
                    }
                    className="bg-gray-100 rounded-full p-2"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <p className="font-bold">{quantity}</p>
                  <button
                    onClick={() => setQuantity((prev) => (prev += 1))}
                    className="bg-gray-100 rounded-full p-2"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
              </div>

              <Button
                onClick={() => handleCart()}
                variant="myBtn"
                size="mySize"
              >
                Add To Cart
              </Button>

              <div className="flex justify-center items-center gap-5">
                <button className="rounded-3xl p-3 bg-accent w-1/2 flex justify-center group hover:scale-105 transition-all duration-300">
                  <Share2 className="w-5 h-5  group-hover:scale-105 transition-all duration-300" />
                </button>
                <button className="rounded-3xl p-3 bg-accent w-1/2 flex justify-center group hover:scale-105 transition-all duration-300">
                  <Heart className="w-5 h-5  group-hover:scale-105 transition-all duration-300" />
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Description Component  */}
      <div>
        <div className="w-full">
          <Tabs defaultValue="1" className="w-full mt-10 mb-20">
            <TabsList className="flex md:grid md:grid-cols-3 md:w-1/2">
              <TabsTrigger className="" value="1">
                Specifications
              </TabsTrigger>
              <TabsTrigger className="" value="2">
                Customer Reviews
              </TabsTrigger>
              <TabsTrigger className="" value="3">
                Description
              </TabsTrigger>
            </TabsList>

            {/* Specifications */}
            <TabsContent value="1">
              <Card className="border-none shadow-none">
                <CardHeader>
                  <CardTitle>Specifications</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-wrap w-full">
                  <div className="w-1/2">
                    <Table>
                      <TableBody>
                        {product.properties.list
                          .slice(
                            0,
                            Math.ceil(product.properties.list.length / 2)
                          )
                          .map((property, index) => (
                            <TableRow key={index}>
                              <TableCell className="bg-accent">
                                {property.name}
                              </TableCell>
                              <TableCell className="text-left">
                                {property.value}
                              </TableCell>
                            </TableRow>
                          ))}
                      </TableBody>
                    </Table>
                  </div>
                  <div className="w-1/2">
                    <Table>
                      <TableBody>
                        {product.properties.list
                          .slice(Math.ceil(product.properties.list.length / 2))
                          .map((property, index) => (
                            <TableRow key={index}>
                              <TableCell className="bg-accent">
                                {property.name}
                              </TableCell>
                              <TableCell className="text-left">
                                {property.value}
                              </TableCell>
                            </TableRow>
                          ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Customer Reviews  */}
            <TabsContent value="2">
              <Card className="border-none shadow-none">
                <CardHeader>
                  <CardTitle> Customer Reviews (0)</CardTitle>
                </CardHeader>
              </Card>
            </TabsContent>

            {/* Description  */}
            <TabsContent value="3">
              <Card className="border-none shadow-none">
                <CardHeader>
                  <CardTitle>Description</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-wrap md:grid md:grid-cols-3 md:gap-4 w-full">
                  {product.description.images.map((src, index) => (
                    <div key={index} className="">
                      <img
                        src={src}
                        alt="img"
                        className="w-[420px] h-[400px] object-contain"
                      />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ProductDescription;
