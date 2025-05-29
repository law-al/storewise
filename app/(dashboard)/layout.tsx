import { cookies } from "next/headers";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "@/components/layout/app-sidebar";
import Navbar from "@/components/layout/Navbar";
import Image from "next/image";

async function Layout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";

  return (
    <SidebarProvider
      defaultOpen={defaultOpen}
      className="flex"
      style={{
        "--sidebar-width": "20rem",
      }}
    >
      <AppSidebar />

      <main className="w-full bg-gray-200 md:px-2 md:py-0 md:bg-white">
        <div className="flex items-center justify-between bg-white shadow-sm md:shadow-none h-[15vh] md:h-[10vh]">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="block !w-4 md:hidden" />
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
        {children}
      </main>
    </SidebarProvider>
  );
}

export default Layout;
