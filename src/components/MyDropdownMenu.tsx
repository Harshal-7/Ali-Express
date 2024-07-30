"use client";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { ChevronDown, Heart, Menu, NotepadText, User } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { ProductsCategory } from "@/config.product";
import { ScrollArea } from "./ui/scroll-area";
import Link from "next/link";

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

export function MyDropdownMenu() {
  const [data, setData] = useState<ProductCategory[]>([]);

  useEffect(() => {
    setData(productsCategory);
  }, []);

  return (
    <div className="w-full max-w-7xl ml-20 p-3">
      <HoverCard openDelay={300} closeDelay={300}>
        <HoverCardTrigger asChild>
          <button className="w-72 flex gap-4 justify-between items-center px-4 py-2 rounded-3xl bg-[#535353]">
            <div className="flex gap-2 justify-center items-center">
              <Menu className="w-5 h-5" />
              All Categories
            </div>
            <ChevronDown className="w-5 h-5" />
          </button>
        </HoverCardTrigger>
        <HoverCardContent className="w-80 rounded-3xl p-4">
          <ScrollArea className="h-[500px] w-full ">
            <div className="">
              {data.map((item, index) => (
                <div key={index}>
                  <HoverCard openDelay={300} closeDelay={300}>
                    <HoverCardTrigger asChild>
                      <button
                        key={index}
                        className="p-2 w-full text-start hover:bg-gray-100 hover:font-bold rounded-md"
                      >
                        {item.name}
                      </button>
                    </HoverCardTrigger>

                    <HoverCardContent
                      side="right"
                      className="w-full rounded-3xl p-4 px-10"
                    >
                      <div className="grid grid-cols-4 gap-4">
                        {item.list.map((listItem, index) => (
                          <div key={index}>
                            <Link href={`/search/${listItem.name}`}>
                              <button
                                key={index}
                                className="w-full text-start hover:text-red-500 rounded-md text-sm"
                              >
                                {listItem.name}
                              </button>
                            </Link>
                          </div>
                        ))}
                      </div>
                    </HoverCardContent>
                  </HoverCard>

                  <Separator className="my-1" />
                </div>
              ))}
            </div>
          </ScrollArea>
        </HoverCardContent>
      </HoverCard>
    </div>
  );
}
