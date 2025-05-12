"use client";

import { formatDistance, subDays } from "date-fns";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  BellIcon,
  LucideIcon,
  NotepadText,
  Search,
  X,
  Package,
  ShoppingCart,
  DollarSign,
  CreditCard,
  AlertCircleIcon,
} from "lucide-react";
import { Input } from "./ui/input";
import SearchDashboard from "./SearchDashboard";
import { useState } from "react";
import { AppNotification, notifications } from "@/lib/data";
import { Button } from "./ui/button";

const NOTIFICATION_ICON: Record<string, LucideIcon> = {
  stock: Package,
  order: ShoppingCart,
  sale: DollarSign,
  payment: CreditCard,
};

function getIconType(iconType: string): LucideIcon {
  return NOTIFICATION_ICON[iconType] || AlertCircleIcon;
}

export default function SideSheetBar({
  sheetType = "search",
}: {
  sheetType?: "search" | "notification";
}) {
  const [notisStatus, setNotisStatus] = useState("all");
  const [openNotificationId, setOpenNotificationId] = useState<string | null>(
    null
  );

  function notificationRead(message: AppNotification): string {
    return openNotificationId === message.id
      ? message.message
      : `${message.message.slice(0, 65)}...`;
  }

  function renderNotification(message: AppNotification) {
    const IconComponent = getIconType(message.type);
    return (
      <div
        className="flex items-center gap-2 cursor-pointer mb-2"
        onClick={() =>
          setOpenNotificationId((prev) =>
            prev === message.id ? null : message.id
          )
        }
      >
        <div className="bg-themeOrange-300/20 w-[50px] h-[50px] rounded-full flex items-center justify-center">
          <IconComponent size={20} className="text-themeOrange-300" />
        </div>

        <div className="flex-1 flex gap-0.5 flex-col">
          <h2 className="font-semibold text-black">{message.title}</h2>
          <p className="text-justify">{notificationRead(message)}</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Sheet>
        <SheetTrigger>
          {sheetType === "search" ? (
            <div className="sm-button md:pl-2 md:py-0.5 md:w-[250px] md:rounded-full md:flex md:items-center md:gap-0.5 md:bg-gray-300/20 md:shadow-xs">
              <Search size={20} className="text-gray-500" />
              <Input
                placeholder="Search"
                className="hidden md:block flex-1 !border-0 !ring-0 active:!border-0 active:!ring-0"
              />
            </div>
          ) : (
            <div className="sm-button">
              <BellIcon size={20} className="text-gray-500" />
            </div>
          )}
        </SheetTrigger>
        <SheetContent side="custom-right" className="max-w-xl">
          {sheetType === "search" ? (
            <>
              <SearchDashboard />
            </>
          ) : (
            <SheetHeader>
              <SheetTitle className="flex items-center justify-between mb-3">
                <p>Notification</p>

                <SheetClose className="rounded-sm opacity-70 ring-offset-white transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-gray-100">
                  <X size={12} className="h-4 w-4" />
                  <span className="sr-only">Close</span>
                </SheetClose>
              </SheetTitle>
              <SheetDescription>
                <span className="flex items-center justify-between mb-6">
                  <span className="flex items-center">
                    <Button
                      variant="ghost"
                      onClick={() => setNotisStatus("all")}
                      className={`${
                        notisStatus === "all"
                          ? "text-themeOrange-300"
                          : "text-black"
                      } cursor-pointer`}
                    >
                      All
                    </Button>
                    <Button
                      variant="ghost"
                      onClick={() => setNotisStatus("unread")}
                      className={`${
                        notisStatus === "unread"
                          ? "text-themeOrange-300"
                          : "text-black"
                      } cursor-pointer`}
                    >
                      Unread
                    </Button>
                  </span>

                  <Button
                    variant="ghost"
                    className="flex items-center gap-1 cursor-pointer hover:text-themeOrange-300 transition-colors duration-100"
                  >
                    <NotepadText size={15} />
                    <p>Mark all as read</p>
                  </Button>
                </span>

                <div className="">
                  {notifications.map((notification, i) => (
                    <div key={i} className="">
                      <span className="mb-1">
                        {new Date(notification.date).toLocaleDateString(
                          "en-US",
                          {
                            weekday: "short", // e.g., "Sat"
                            day: "numeric", // e.g., 9
                            month: "short", // e.g., "Nov"
                            year: "numeric", // e.g., 2021
                          }
                        )}
                      </span>

                      <div className="">
                        {notification.messages.map((message, i) => (
                          <div key={message.id} className="">
                            {renderNotification(message, i)}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </SheetDescription>
            </SheetHeader>
          )}
        </SheetContent>
      </Sheet>
    </>
  );
}
