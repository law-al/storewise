import { cookies } from "next/headers";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "@/components/layout/app-sidebar";
import Navbar from "@/components/layout/Navbar";
import Image from "next/image";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";

  return (
    <SidebarProvider
      defaultOpen={defaultOpen}
      className="flex min-h-screen"
      style={{ "--sidebar-width": "20rem" }}
    >
      <AppSidebar />
      <main className="flex-1 bg-gray-200 md:bg-white md:p-4">
        <header className="flex items-center justify-between bg-white h-16 px-4 md:h-14 md:px-0">
          <div className="flex items-center gap-2">
            <SidebarTrigger
              className="md:hidden w-6 h-6"
              aria-label="Toggle sidebar"
            />
            <Image
              src="/logo-png.png"
              alt="Storewise Logo"
              width={30}
              height={30}
              className="md:hidden"
            />
          </div>
          <Navbar />
        </header>
        <div className="p-4 md:p-0">{children}</div>
      </main>
    </SidebarProvider>
  );
}
