"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, ArrowLeftCircle, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

export default function PaginationComponent({ items, handleSetCurrentItem }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage, setItemPerPage] = useState("5");

  const indexOfLastItem = currentPage * +itemPerPage;
  const indexOfFirstItem = indexOfLastItem - +itemPerPage;

  useEffect(() => {
    const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);
    handleSetCurrentItem(currentItems);
  }, [handleSetCurrentItem, indexOfFirstItem, indexOfLastItem, items]);

  return (
    <div className="w-full flex flex-col gap-2 md:gap-0 md:flex-row items-center justify-between">
      <Pagination className="justify-center md:!justify-start">
        <PaginationContent className="flex items-center gap-3">
          <PaginationItem className="border border-gray-300 rounded-full p-2">
            <ArrowLeft />
          </PaginationItem>
          {Array.from(
            { length: Math.ceil(items.length / +itemPerPage) },
            (_, i) => (
              <PaginationItem key={i} className="">
                <PaginationLink
                  onClick={() => setCurrentPage(i + 1)}
                  href="#"
                  className="border border-gray-300 rounded-full p-2"
                  isActive={currentPage === i + 1}
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            )
          )}
          {/* <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>*/}
          <PaginationItem className="border border-gray-300 rounded-full p-2">
            <ArrowRight />
          </PaginationItem>
        </PaginationContent>
      </Pagination>

      <div className="flex-1 flex items-center gap-2">
        <p className="text-sm">show</p>

        <Select value={itemPerPage} onValueChange={setItemPerPage}>
          <SelectTrigger className="w-fit rounded-full border-gray-300 ring-gray-300">
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
  );
}
