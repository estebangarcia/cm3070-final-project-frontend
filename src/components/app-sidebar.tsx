import {  Database, LayoutDashboard, Router } from "lucide-react"
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarHeader,
    SidebarFooter,
    SidebarRail,
} from "@/components/ui/sidebar"

import { NavUser } from "./nav-user"
import { OrganizationSwitcher } from "./organization-switcher";
import React from "react";
import { auth } from "@/auth";
import { getOrganizations } from "@/lib/orgs/api";
import { Organization } from "@/models/organization";

const items = [
    {
        title: "Dashboard",
        url: "/dashboard",
        icon: LayoutDashboard,
    },
    {
        title: "Registries",
        url: "/dashboard/registries",
        icon: Database,
    },
]

export async function AppSidebar({ organizationSlug }: { organizationSlug: string}) {
    const session = await auth();

    const organizations: Organization[] = await getOrganizations(session?.access_token);
    let currentOrg = null
    for(let i = 0; i < organizations.length; i++) {
        if(organizations[i].slug == organizationSlug) {
            currentOrg = organizations[i]
            break
        }
    }

    return (
        <Sidebar>
            <SidebarHeader>
                <OrganizationSwitcher
                    organizations={organizations}
                    defaultOrganization={currentOrg!}
                />
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Application</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                        {items.map((item) => (
                            <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton asChild>
                                <a href={item.url}>
                                <item.icon />
                                <span>{item.title}</span>
                                </a>
                            </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={session?.user} />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}