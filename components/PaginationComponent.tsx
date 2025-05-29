import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Products } from "@/lib/data";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { parseAsInteger, useQueryState } from "nuqs";
import { JSX, useMemo, useState } from "react";

type PaginationPropType<T> = {
  items: T[];
  enableIsAvailable: boolean;
  children: (prop: {
    currentItems: T[];
    handleAvailable?: (available: boolean, id: string) => void;
  }) => JSX.Element;
};

export default function PaginationComponent<T>({
  items: initialItems,
  enableIsAvailable = false,
  children,
}: PaginationPropType<T>) {
  const [currentPage, setCurrentPage] = useQueryState(
    "page",
    parseAsInteger.withDefault(1)
  );
  const [itemPerPage, setItemPerPage] = useQueryState("item", {
    defaultValue: "5",
  });
  const [items, setItems] = useState(initialItems);

  console.log(itemPerPage);

  const indexOfLastItem = currentPage * +itemPerPage;
  const indexOfFirstItem = indexOfLastItem - +itemPerPage;

  const currentItems = useMemo(
    () => items.slice(indexOfFirstItem, indexOfLastItem),
    [indexOfFirstItem, indexOfLastItem, items]
  );

  function handleAvailable(available: boolean, id: string) {
    if (!enableIsAvailable) return;

    setItems((prev) =>
      prev.map((item) => {
        // Type guard to check if item matches our WithProductId interface
        const hasProductId = (obj: Products): obj is Products =>
          "productId" in obj && typeof obj.productId === "string";

        // Skip if item doesn't have productId
        if (!hasProductId(item)) return item;

        // Now TypeScript knows item has productId
        if (item.productId === id) {
          // Handle the available property
          return {
            ...item,
            available: !available,
          };
        }

        return item;
      })
    );
  }

  return (
    <>
      {children({ currentItems, handleAvailable })}

      <div className="flex flex-col items-center justify-between w-full gap-2 md:gap-0 md:flex-row">
        <Pagination className="justify-center md:!justify-start">
          <PaginationContent className="flex items-center gap-3">
            <PaginationItem className="p-2 border border-gray-300 rounded-full">
              <ArrowLeft />
            </PaginationItem>
            {Array.from(
              { length: Math.ceil(items.length / +itemPerPage) },
              (_, i) => (
                <PaginationItem key={i} className="">
                  <div
                    onClick={() => setCurrentPage(i + 1)}
                    role="button"
                    className="flex items-center justify-center w-10 h-10 p-2 border border-gray-300 rounded-full cursor-pointer"
                  >
                    {i + 1}
                  </div>
                </PaginationItem>
              )
            )}
            <PaginationItem className="p-2 border border-gray-300 rounded-full">
              <ArrowRight />
            </PaginationItem>
          </PaginationContent>
        </Pagination>

        <div className="flex items-center flex-1 gap-2">
          <p className="text-sm">show</p>

          <Select value={itemPerPage} onValueChange={setItemPerPage}>
            <SelectTrigger className="border-gray-300 rounded-full w-fit ring-gray-300">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5">5</SelectItem>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
              <SelectItem value="30">30</SelectItem>
            </SelectContent>
          </Select>

          <p>from</p>
          <span className="font-semibold">180</span>
        </div>
      </div>
    </>
  );
}
