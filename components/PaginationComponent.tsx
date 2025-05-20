"use client";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useState, useMemo, JSX } from "react";

// Generic PaginationProps to handle any item type
type PaginationProps<T> = {
  items: T[];
  children: (props: {
    currentItems: T[];
    handleAvailable?: (available: boolean, id: string) => void | undefined;
  }) => JSX.Element;
};

// Generic PaginationComponent
export default function PaginationComponent<T>({
  items: initialItems,
  children,
}: PaginationProps<T>) {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage, setItemPerPage] = useState("5");
  const [items, setItems] = useState(initialItems);

  // Update items when initialItems changes (e.g., on page navigation or data update)
  useMemo(() => {
    setItems(initialItems);
    setCurrentPage(1); // Reset to first page when items change
  }, [initialItems]);

  // Calculate paginated items
  const indexOfLastItem = currentPage * +itemPerPage;
  const indexOfFirstItem = indexOfLastItem - +itemPerPage;
  const currentItems = useMemo(
    () => items.slice(indexOfFirstItem, indexOfLastItem),
    [items, indexOfFirstItem, indexOfLastItem]
  );

  // Handle product availability toggle (optional, for datasets with an 'available' field)
  const handleAvailable = (available: boolean, id: string) => {
    setItems((prev) =>
      prev.map((item: any) =>
        item.productId === id || item.id === id
          ? { ...item, available: !available }
          : item
      )
    );
  };

  // Handle page navigation
  const totalPages = Math.ceil(items.length / +itemPerPage);
  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };
  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="flex flex-col">
      <div className="h-full flex flex-col justify-between border border-red-400">
        {/* Render paginated items and pass handleAvailable */}
        {children({ currentItems, handleAvailable })}
      </div>

      <div className="flex items-center justify-between">
        <Pagination className="w-fit mx-0">
          <PaginationContent>
            <PaginationItem>
              <PaginationLink
                onClick={handlePrevious}
                className="cursor-pointer"
              >
                <ArrowLeft className="h-4 w-4" />
              </PaginationLink>
            </PaginationItem>

            {Array.from({ length: totalPages }, (_, i) => (
              <PaginationItem key={i}>
                <PaginationLink
                  onClick={() => setCurrentPage(i + 1)}
                  href="#"
                  className={`${currentPage === i + 1 ? "bg-gray-200" : ""}`}
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationLink onClick={handleNext} className="cursor-pointer">
                <ArrowRight className="h-4 w-4" />
              </PaginationLink>
            </PaginationItem>
          </PaginationContent>
        </Pagination>

        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">Show</span>
          <Select
            value={itemPerPage}
            onValueChange={(value) => {
              setItemPerPage(value);
              setCurrentPage(1); // Reset to first page when changing items per page
            }}
          >
            <SelectTrigger className="w-16 h-8">
              <SelectValue placeholder="5" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5">5</SelectItem>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
              <SelectItem value="30">30</SelectItem>
            </SelectContent>
          </Select>
          <span className="text-sm text-gray-500">from {items.length}</span>
        </div>
      </div>
    </div>
  );
}
