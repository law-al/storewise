import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Image from "next/image";

import React from "react";
import { Separator } from "./ui/separator";
import { Products } from "@/lib/data";
import ProductDropdown from "./utils/ProductDropdown";

export default function ProductGrid({
  currentItems,
  handleAvailable,
}: {
  currentItems: Products[];
  handleAvailable: (available: boolean, id: string) => void;
}) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {currentItems.map((product) => (
        <div key={product.productId}>
          <Card className="p-0 border-none shadow-none !gap-1 md:!gap-2 relative">
            <CardContent className="p-0">
              <Image
                src={product.item.image}
                alt="Product image"
                width={100}
                height={70}
                className="w-[100%] h-[60%] rounded-md mb-1 md:mb-2"
              />
              <div className="mb-1 md:mb-2">
                <p className="text-xs md:text-sm mb-1 font-medium">
                  {product.item.name}
                </p>
                <span className="text-[14px] md:text-lg font-medium text-themeOrange-300">
                  ${product.item.price.toLocaleString()}
                </span>
              </div>
              <Separator />
            </CardContent>
            <CardFooter className="p-0 flex items-center justify-between">
              <div className="">
                <span className="text-xs md:text-sm">Sales</span>
                <p className="text-[14px] md:text-lg block">
                  <span className="font-semibold">{product.sales}</span>
                </p>
              </div>
              <div className="text-center">
                <span className="text-xs md:text-sm">Revenue</span>
                <p className="text-[14px] md:text-lg block">
                  <span className="font-semibold">
                    ${product.revenue.toLocaleString()}
                  </span>
                </p>
              </div>
            </CardFooter>

            <div className="rounded-full absolute z-50 right-0 top-0 translate-y-3 -translate-x-1/2 bg-white px-2">
              <ProductDropdown
                orientation="horizontal"
                product={product}
                handleAvailable={handleAvailable}
              />
            </div>
          </Card>
        </div>
      ))}
    </div>
  );
}
