import { Calendar, Database, Home, Inbox, LayoutDashboard, Search, Settings } from "lucide-react"
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
import { auth } from "@/auth";

import { Organization } from "@/models/organization";

const items = [
    {
        title: "Dashboard",
        url: "#",
        icon: LayoutDashboard,
    },
    {
        title: "Registries",
        url: "#",
        icon: Database,
    },
]

async function getOrganizations() {
    const session = await auth() as any;
    const res = await fetch(process.env.API_BASE_URL + "/organizations", {
        headers: { "Authorization":  `Bearer ${session?.accessToken}` }
    })
    return res.json()
}

function getPersonalOrganization(organizations: Organization[]): Organization {
    let result = organizations.filter(org => {
        return org.is_personal;
    })
    return result[0]
}

export async function AppSidebar() {
    const session = await auth();
    const organizations: Organization[] = await getOrganizations();

    return (
        <Sidebar>
            <SidebarHeader>
                <OrganizationSwitcher
                    organizations={organizations}
                    defaultOrganization={getPersonalOrganization(organizations)}
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