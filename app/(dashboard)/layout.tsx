import { cookies } from "next/headers";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "@/components/app-sidebar";

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
      className="flex gap-6"
      style={{
        "--sidebar-width": "20rem",
        "--sidebar-width-mobile": "20rem",
      }}
    >
      <AppSidebar />

      <main>
        <SidebarTrigger className="block md:hidden" />
        {children}
      </main>
    </SidebarProvider>
  );
}
