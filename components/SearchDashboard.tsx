import Form from "next/form";

import { formatDistance, subDays } from "date-fns";

import { SheetClose, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Dot, MoreVertical, Search, ShoppingBag, X } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { customers, searchOptions, searchOrderSummary } from "@/lib/data";
import Image from "next/image";

export default function SearchDashboard() {
  return (
    <>
      <SheetHeader className="py-2">
        <SheetTitle className="border-b border-gray-200 pb-3 mb-4 flex items-center justify-between">
          <Form action="/query" className="flex items-center gap-2 w-[80%]">
            <Input
              name="search"
              placeholder="Search anything"
              className="flex-1 border-0 focus-visible:ring-0"
              aria-label="Search input"
            />
            <Button
              type="submit"
              className="flex items-center gap-2 rounded-full"
              aria-label="Submit search"
            >
              <Search className="h-4 w-4" />
              <span>Search</span>
            </Button>
          </Form>
          <SheetClose className="rounded-sm opacity-70 ring-offset-white transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-gray-100">
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </SheetClose>
        </SheetTitle>

        <div>
          <div className="mb-3">
            <p className="mb-2">I&apos;m searching for</p>
            <div className="flex flex-wrap items-center gap-2">
              {searchOptions.map((item) => (
                <button
                  key={item.title}
                  className="flex items-center gap-2 rounded-full border border-gray-700 p-2 text-black hover:bg-gray-100"
                >
                  <item.logo size={16} />
                  <span>{item.title}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Order */}
          <div className="mb-3">
            <p className="mb-2">Orders</p>

            <div className="">
              {searchOrderSummary.map((item) => (
                <div
                  key={item.orderNumber}
                  className="rounded-md cursor-pointer hover:bg-gray-300/20 p-2 flex items-center gap-2"
                >
                  <ShoppingBag />
                  <div className="">
                    <div className="flex flex-col gap-2">
                      <p className="text-[16px] font-semibold text-black">
                        Order {item.orderNumber}
                      </p>

                      <div className="flex items-center gap-1">
                        <div className="flex items-center">{item.status}</div>

                        <div className="flex items-center gap-1">
                          <Dot size={20} />
                          {item.customer}
                        </div>

                        <div className="flex items-center gap-1">
                          <Dot size={20} />

                          {formatDistance(
                            subDays(new Date(item.createdAt), 1),
                            new Date(),
                            { addSuffix: true }
                          )}
                        </div>
                      </div>
                    </div>
                    <div className=""></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* User */}
          <div className="mb-3">
            <p className="mb-2">Customer</p>
            {customers.map((item) => (
              <div key={item.name} className="flex items-center gap-2 mb-2">
                <Image
                  src={item.image}
                  alt="customer image"
                  width={40}
                  height={40}
                  className="w-13 h-13 object-cover rounded-full"
                />

                <div className="flex-1 flex items-center justify-between">
                  <div className="">
                    <p className="inline mr-2 font-semibold">{item.name}</p>
                    <span className="text-blue-500">@{item.username}</span>
                  </div>
                  <MoreVertical className="cursor-pointer hover:bg-gray-200/20" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </SheetHeader>
    </>
  );
}
