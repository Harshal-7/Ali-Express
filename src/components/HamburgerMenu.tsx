"use client";

import React, { useEffect, useState } from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { HamburberCategory, ProductsCategory } from "@/config.product";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { useRouter } from "next/navigation";

const HamburgerMenu = () => {
  const [data, setData] = useState<any>([]);

  useEffect(() => {
    setData(HamburberCategory);
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
            {data.map((item: any, index: any) => (
              <Link href={`/search/${item.name}`} key={index} className="">
                <SheetClose className="flex gap-5 justify-start items-center">
                  <img
                    src={item.img}
                    alt="img"
                    className="w-12 h-12 object-contain rounded-lg"
                  />
                  <div className="text-xl text-start">{item.name}</div>
                </SheetClose>
              </Link>
            ))}
          </SheetTitle>
          <Separator className="my-1 mt-12" />

          <SheetDescription></SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default HamburgerMenu;
