"use client";

import {
  ChevronDown,
  GitGraph,
  Home,
  Inbox,
  List,
  LogOut,
  LucideIcon,
  MenuIcon,
  Settings,
  Settings2Icon,
  ShoppingBag,
  ShoppingBasket,
  Store,
  Users2,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { CustomTrigger } from "../ui/customs/CustomTrigger";
import Image from "next/image";
import Link from "next/link";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import { usePathname } from "next/navigation";
import Navbar from "./Navbar";

interface Items {
  title: string;
  url: string;
  icon: LucideIcon; // or React.ElementType or React.ReactNode depending on your use
  ariaLabel: string;
}

// Navigation items with consistent structure
const navItems = {
  main: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: Home,
      ariaLabel: "Navigate to dashboard",
    },
    {
      title: "Product",
      url: "/product",
      icon: ShoppingBag,
      ariaLabel: "Navigate to products page",
    },
    {
      title: "Orders",
      url: "/orders",
      icon: List,
      ariaLabel: "View orders",
    },
    {
      title: "Customers",
      url: "/customers",
      icon: Users2,
      ariaLabel: "Manage customers",
    },
    {
      title: "Store",
      url: "/store",
      icon: Store,
      ariaLabel: "Manage store",
    },
    {
      title: "Analytics",
      url: "/analytics",
      icon: GitGraph,
      ariaLabel: "View analytics",
    },
  ],
  tools: [
    {
      title: "Affiliates",
      url: "/affiliates",
      icon: Inbox,
      ariaLabel: "Manage affiliates",
    },
    {
      title: "Setup store",
      url: "/setup_store",
      icon: Settings2Icon,
      ariaLabel: "Edit preferences",
    },
  ],
  userOption: [
    {
      title: "Settings",
      url: "/settings",
      icon: Settings,
      ariaLabel: "Edit preferences",
    },
    {
      title: "Logout",
      url: "/logout",
      icon: LogOut,
      ariaLabel: "Logout from the application",
    },
  ],
};

// Reusable NavGroup component to reduce duplication
function NavGroup({
  title,
  items,
  isCollapsed,
  pathName,
  toggleSidebar,
  isMobile,
}: {
  title: string;
  items: Items[];
  isCollapsed: boolean;
  pathName?: string;
  toggleSidebar?;
  isMobile: boolean;
}) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel
        className={`${
          isCollapsed ? "!opacity-100 justify-center !mt-0" : ""
        } text-sm font-medium text-gray-500`}
      >
        {title}
      </SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem
              key={item.title}
              className={`flex !rounded-full ${
                pathName === item.url ? "bg-themeOrange-300/20" : ""
              } ${isCollapsed ? "justify-center" : ""}`}
            >
              <SidebarMenuButton asChild>
                <Link
                  href={item.url}
                  onClick={() => isMobile && toggleSidebar()}
                  className={`py-3 h-10 flex items-center ${
                    pathName === item.url
                      ? "text-themeOrange-300 hover:!bg-themeOrange-300/5"
                      : "text-black"
                  }  hover:!bg-themeOrange-300/5`}
                  aria-label={item.ariaLabel}
                >
                  {item.icon && (
                    <item.icon
                      className={`w-5 h-5  ${
                        pathName === item.url
                          ? "text-themeOrange-300"
                          : "text-gray-500"
                      }`}
                      aria-hidden="true"
                    />
                  )}
                  <span
                    className={`${isCollapsed ? "" : "ml-3"} ${
                      pathName === item.url
                        ? "text-themeOrange-300"
                        : "text-black"
                    }`}
                  >
                    {item.title}
                  </span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}

function MobileNav() {
  return (
    <div className="flex items-center justify-between p-3 w-full h-[15vh]">
      <div className="flex items-center gap-2">
        <CustomTrigger isMobile={true} />
        {/* <p className="block md:hidden">y</p> */}
        <Image
          src="/logo-png.png"
          alt="Brand Logo"
          width={30}
          height={30}
          className="block md:hidden"
        />
      </div>
      <Navbar />
    </div>
  );
}

export default function AppSidebar() {
  const pathName = usePathname();
  const { state, isMobile, toggleSidebar } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <Sidebar
      variant="floating"
      collapsible="icon"
      role="navigation"
      aria-label="Main Navigation"
    >
      <SidebarContent className="flex flex-col justify-between">
        {/* Main Navigation Area */}
        <nav className={`flex flex-col gap-1`}>
          {/* Logo and Toggle */}
          <SidebarGroup className={`${isMobile ? "!p-0" : "p-2"}`}>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem className="flex items-center justify-between transition-all duration-150">
                  {!isMobile ? (
                    <>
                      <Link
                        href="/home"
                        className="flex items-center gap-1"
                        aria-label="Go to Storewise homepage"
                      >
                        <Image
                          src="/logo-png.png"
                          alt="Storewise Logo"
                          width={40}
                          height={40}
                        />
                        <h1
                          className={`font-semibold text-lg ${
                            isCollapsed ? "hidden" : "block"
                          } transition-all duration-150`}
                        >
                          Storewise
                        </h1>
                      </Link>
                      <CustomTrigger
                        isCollapsed={isCollapsed}
                        aria-label={
                          isCollapsed ? "Expand sidebar" : "Collapse sidebar"
                        }
                      />
                    </>
                  ) : (
                    <MobileNav />
                  )}
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          {/* Shop Section - Collapsible */}
          <SidebarGroup>
            <SidebarGroupContent>
              <Collapsible className="w-full group/collapsible">
                <SidebarGroupLabel
                  asChild
                  className={`${
                    isCollapsed
                      ? "!opacity-100 !mt-0 flex items-center justify-center"
                      : ""
                  }`}
                >
                  <CollapsibleTrigger
                    className="flex items-center w-full p-4 bg-white rounded-full shadow-sm"
                    aria-label="Toggle shop section"
                  >
                    <div className={`flex items-center gap-2`}>
                      <ShoppingBasket
                        size={20}
                        className="text-orange-500"
                        aria-hidden="true"
                      />
                      {!isCollapsed && (
                        <span className="text-sm font-semibold text-orange-500">
                          DPOP&apos;S Shop
                        </span>
                      )}
                    </div>

                    {!isCollapsed && (
                      <ChevronDown
                        size={18}
                        className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-180"
                        aria-hidden="true"
                      />
                    )}
                  </CollapsibleTrigger>
                </SidebarGroupLabel>

                <CollapsibleContent className="px-4 py-2">
                  {!isCollapsed && (
                    <ul className="space-y-2">
                      {navItems.tools.map((item) => (
                        <li key={item.title}>
                          <Link
                            href={item.url}
                            className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100"
                            aria-label={item.ariaLabel}
                          >
                            <span>{item.title}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </CollapsibleContent>
              </Collapsible>
            </SidebarGroupContent>
          </SidebarGroup>

          {/* Main Menu */}
          <NavGroup
            title="Menu"
            items={navItems.main}
            isCollapsed={isCollapsed}
            pathName={pathName}
            toggleSidebar={toggleSidebar}
            isMobile={isMobile}
          />

          {/* Tools Section */}
          <NavGroup
            title="Tools"
            items={navItems.tools}
            isCollapsed={isCollapsed}
            pathName={pathName}
            toggleSidebar={toggleSidebar}
            isMobile={isMobile}
          />
        </nav>

        {/* Footer with User Profile */}
        <SidebarFooter>
          <SidebarGroup className="mt-auto bg-white rounded-lg shadow-md">
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <div
                    className={`flex items-center border-b border-b-themeGrey-50 py-2 ${
                      isCollapsed ? "justify-center" : ""
                    } gap-2`}
                  >
                    <Image
                      src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                      alt="Image"
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                    <div
                      className={`flex-1 ${
                        isCollapsed ? "hidden" : " flex "
                      }  items-center justify-between`}
                    >
                      <div className="">
                        <p className="text-sm font-semibold">Fajar</p>
                        <span className="text-xs font-light">
                          fajaar02@gmail.com
                        </span>
                      </div>
                      <div className="cursor-pointer">
                        <MenuIcon />
                      </div>
                    </div>
                  </div>
                </SidebarMenuItem>

                {navItems.userOption.map((item) => (
                  <SidebarMenuItem
                    key={item.title}
                    className={`flex ${isCollapsed ? "justify-center" : ""}`}
                  >
                    <SidebarMenuButton asChild>
                      <Link
                        href={item.url}
                        className="flex items-center h-10 py-3"
                        aria-label={item.ariaLabel}
                      >
                        <item.icon
                          className={`w-5 h-5 ${
                            item.title === "Logout"
                              ? "text-red-400"
                              : " text-gray-500"
                          }`}
                          aria-hidden="true"
                        />
                        <span
                          className={`${isCollapsed ? "sr-only" : "ml-3"} ${
                            item.title === "Logout"
                              ? "text-red-400"
                              : "text-black"
                          }`}
                        >
                          {item.title}
                        </span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarFooter>
      </SidebarContent>
    </Sidebar>
  );
}
