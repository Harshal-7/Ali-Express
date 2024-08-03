"use client";
import * as React from "react";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export function ProductImageCarousel({ src }: { src: string }) {
  return (
    <Carousel className="w-full max-w-xs">
      <CarouselContent>{src}</CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
