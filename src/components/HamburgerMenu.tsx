"use client";

import React, { useEffect, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { ProductsCategory } from "@/config.product";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

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

const HamburgerMenu = () => {
  const [data, setData] = useState<ProductCategory[]>([]);

  useEffect(() => {
    // console.log(productsCategory);
    setData(productsCategory);
  }, []);

  return (
    <Sheet>
      <SheetTrigger>
        <Menu className="w-6 h-6" />
      </SheetTrigger>
      <SheetContent side="left" className="overflow-y-auto">
        <Separator className="my-1 mt-12" />
        <SheetHeader className="mt-6">
          <SheetTitle className="text-base font-normal flex flex-col gap-5 text-start ">
            {data.map((item, index) => (
              <div key={index}>
                <div key={index} className="">
                  {item.name}
                </div>
                <Separator className="my-1" />
              </div>
            ))}
          </SheetTitle>

          <SheetDescription></SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default HamburgerMenu;
