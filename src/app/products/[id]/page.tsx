"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Heart, Lock, Minus, Plus, Share2, ShoppingCart } from "lucide-react";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";

const ProductDescription = ({ params }: { params: { id: Number } }) => {
  const [product, setProduct] = useState<any>();
  const [quantity, setQuantity] = useState(1);
  const [updateCart, setUpdateCart] = useState(false);
  const [isAddedToWishlist, setIsAddedToWishlist] = useState(false);

  const { toast } = useToast();

  useEffect(() => {
    // API call to fetch product details
    const handleProductInfo = async (itemId: any) => {
      const response = await axios.get(
        `https://ali-express-clone.onrender.com/api/product/${itemId}`
      );

      setProduct(response?.data?.item);
      console.log("PRODUCT DESCRIPTION : ", response?.data?.item);
      // setQuantity()
    };

    const itemId = Number(params.id);
    handleProductInfo(itemId);
  }, []);

  // Add Item To Cart
  const handleCart = async () => {
    try {
      await axios.post(
        "https://ali-express-clone.onrender.com/api/cart/add",
        {
          productId: `${product.itemId}`,
          title: `${product.title}`,
          price: (product.sku.def.promotionPrice * 83).toFixed(2),
          image: `${product.images[0]}`,
          quantity: quantity,
          size: "m",
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: document.cookie,
          },
        }
      );
    } catch (error) {
      console.log("ERROR adding to cart : ", error);
    }
    setUpdateCart(true);
  };

  // Update item quantity inside cart
  const handleUpdateCart = async () => {
    try {
      const res = await axios.patch(
        `https://ali-express-clone.onrender.com/api/cart/${product.itemId}`,
        {
          productId: `${product.itemId}`,
          quantity: quantity,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: document.cookie,
          },
        }
      );

      toast({
        title: "Cart updated successfully",
        className: "text-red-600 bg-white hover:bg-gray-100 font-bold",
      });
    } catch (error) {
      console.log("ERROR updating cart : ", error);
    }
  };

  const handleRemoveFromWishlist = async () => {
    try {
      await axios.delete(
        `https://ali-express-clone.onrender.com/api/wishlist/removeone/${product.itemId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: document.cookie,
          },
        }
      );
    } catch (error) {
      console.log("ERROR removing from wishlist : ", error);
    }
  };

  const handleWishList = async () => {
    if (isAddedToWishlist) {
      handleRemoveFromWishlist();
      return;
    }
    try {
      await axios.post(
        "https://ali-express-clone.onrender.com/api/wishlist/add",
        {
          productId: `${product.itemId}`,
          title: `${product.title}`,
          price: (product.sku.def.promotionPrice * 83).toFixed(2),
          image: `${product.images[0]}`,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: document.cookie,
          },
        }
      );
    } catch (error) {
      console.log("ERROR adding to wishlist : ", error);
    }
    setUpdateCart(true);
    setIsAddedToWishlist(true);
  };

  const handleClick = (e: any) => {
    e.currentTarget.disabled = true;
    console.log("clicked");
  };

  if (!product) {
    return <div>Loading</div>;
  }

  return (
    <div className="w-full flex flex-col max-w-screen-2xl mx-auto mt-10">
      {/* TOP COMPONENT  */}
      <div className="w-full flex flex-col md:flex-row items-center md:items-start md:gap-2">
        {/* Leftside Component : Image-Name-Price  */}
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
                {product.images.map((item: any, index: number) => (
                  <CarouselItem key={index}>
                    <div className="p-1">
                      <Card className="border-none shadow-none rounded-xl">
                        <CardContent className="flex items-center justify-center p-2 overflow-hidden">
                          <img
                            src={item}
                            alt="img"
                            className="w-full h-[450px] object-cover rounded-xl hover:scale-110 transition-transform duration-300"
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

            {/* Product Name-Price  */}
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
                  {product.sku.props[0].values.map(
                    (item: any, index: number) => (
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
                    )
                  )}
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
                onClick={(e) => {
                  handleCart();
                  handleClick(e);
                }}
                variant="myBtn"
                size="mySize"
              >
                Add To Cart
              </Button>

              {updateCart && (
                <Button
                  onClick={() => handleUpdateCart()}
                  variant="myBtn"
                  size="mySize"
                >
                  Update Cart
                </Button>
              )}

              <div className="flex justify-center items-center gap-5 ">
                <button className="rounded-3xl p-3 bg-accent w-1/2 flex justify-center group hover:scale-105 transition-all duration-300">
                  <Share2 className="w-5 h-5  group-hover:scale-105 transition-all duration-300" />
                </button>
                <button
                  onClick={() => handleWishList()}
                  className="rounded-3xl p-3 bg-accent w-1/2 flex justify-center group hover:scale-105 transition-all duration-300"
                >
                  {isAddedToWishlist ? (
                    <Heart
                      fill="red"
                      className="w-5 h-5 group-hover:scale-105 transition-all duration-300"
                    />
                  ) : (
                    <Heart className="w-5 h-5 group-hover:scale-105 transition-all duration-300" />
                  )}
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
                          .map((property: any, index: any) => (
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
                          .map((property: any, index: any) => (
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
                  {product.description.images.map((src: any, index: any) => (
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
