import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { Separator } from "@/components/ui/separator"
import { auth } from "@/auth";
import { getOrganization } from "@/lib/orgs/api";
import { notFound } from "next/navigation";
import { getRegistries } from "@/lib/registries/api";


export default async function SidebarLayout({children, organization, registry}: {
  children: React.ReactNode;
  organization: string;
  registry?: string;
}) {  
  const session = await auth();
  
  const org = await getOrganization(session?.access_token, organization)
  if(!org) {
    notFound();
  }

  const registries = await getRegistries(session?.access_token, organization);

  return (
    <SidebarProvider>
      <AppSidebar organizationSlug={organization} registries={registries} activeRegistrySlug={registry} />
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
