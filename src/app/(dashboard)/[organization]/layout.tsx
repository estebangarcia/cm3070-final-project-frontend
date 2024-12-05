import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { Separator } from "@/components/ui/separator"
import { auth } from "@/auth";
import { getOrganization } from "@/lib/orgs/api";
import { notFound } from "next/navigation";

export default async function Layout({children, params}: { children: React.ReactNode, params: Promise<{organization: string}> }) {  
  const session = await auth();  
  const { organization } = await params;
  
  const org = await getOrganization(session?.access_token, organization)
  if(!org) {
    notFound();
  }

  return (
    <SidebarProvider>
      <AppSidebar organizationSlug={organization} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
        </header>
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
