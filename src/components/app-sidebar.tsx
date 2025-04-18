import {  ChevronRight, Database, LayoutDashboard, Users } from "lucide-react"
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuAction,
    SidebarMenuSubItem,
    SidebarMenuSubButton,
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
import { Registry } from "@/models/registry";
import Link from "next/link";

interface SideBarProps {
    organizationSlug: string;
    registries: Registry[];
    activeRegistrySlug?: string;
}

export async function AppSidebar({ organizationSlug, registries, activeRegistrySlug }: SideBarProps) {
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
                            <SidebarMenuItem key="Dashboard">
                                <SidebarMenuButton asChild>
                                    <Link href={`/${organizationSlug}/dashboard`}>
                                        <LayoutDashboard />
                                        <span>Dashboard</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <Collapsible
                                key="registries"
                                asChild
                                defaultOpen={activeRegistrySlug != undefined}
                                className="group/collapsible"
                            >
                                <SidebarMenuItem key="Registries">
                                    <SidebarMenuButton asChild>
                                        <Link href={`/${organizationSlug}/registries`}>
                                            <Database />
                                            <span>Registries</span>
                                        </Link>
                                    </SidebarMenuButton>
                                    {registries.length > 0 ? (
                                        <>
                                            <CollapsibleTrigger asChild>
                                                <SidebarMenuAction className="data-[state=open]:rotate-90">
                                                    <ChevronRight />
                                                    <span className="sr-only">Toggle</span>
                                                </SidebarMenuAction>
                                            </CollapsibleTrigger>
                                            <CollapsibleContent>
                                                <SidebarMenuSub>
                                                    {registries.map((registry) => (
                                                        <SidebarMenuSubItem key={registry.name}>
                                                            <SidebarMenuSubButton asChild isActive={registry.slug == activeRegistrySlug}>
                                                                <Link href={`/${organizationSlug}/registries/${registry.slug}`}>{registry.name}</Link>
                                                            </SidebarMenuSubButton>
                                                        </SidebarMenuSubItem>
                                                    ))}
                                                </SidebarMenuSub>
                                            </CollapsibleContent>
                                        </>
                                    ) : null}
                                </SidebarMenuItem>
                            </Collapsible>
                            <SidebarMenuItem key="Members">
                                <SidebarMenuButton asChild>
                                    <Link href={`/${organizationSlug}/members`}>
                                        <Users />
                                        <span>Organization Members</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
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