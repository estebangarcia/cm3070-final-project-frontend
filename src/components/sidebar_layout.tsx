import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { Separator } from "@/components/ui/separator"
import { auth } from "@/auth";
import { getOrganization } from "@/lib/orgs/api";
import { notFound } from "next/navigation";
import { getRegistries } from "@/lib/registries/api";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Mail } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { getOrganizationInvites } from "@/lib/invites/api";
import OrganizationInvitesPopover from "./org_invites_popover";



export default async function SidebarLayout({children, organization, registry}: {
  children: React.ReactNode;
  organization: string;
  registry?: string;
}) {  
  const session = await auth();

  const responses = await Promise.all([
    getOrganization(session?.access_token, organization),
    getRegistries(session?.access_token, organization),
    getOrganizationInvites(session?.access_token)
  ])
  
  const org = responses[0];
  if(!org) {
    notFound();
  }

  const registries = responses[1];
  const invites = responses[2];

  return (
    <SidebarProvider>
      <AppSidebar organizationSlug={organization} registries={registries} activeRegistrySlug={registry} />
      <SidebarInset>
        <header className="flex w-full h-16 shrink-0 items-center gap-2 border-b px-4">
          <div className="flex h-[--header-height] w-full items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <OrganizationInvitesPopover invites={invites} />
          </div>
        </header>
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
