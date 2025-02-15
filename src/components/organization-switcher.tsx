"use client"

import * as React from "react"
import { useEffect } from "react"
import { Check, ChevronsUpDown, GalleryVerticalEnd } from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

import { Organization } from "@/models/organization"
import { useRouter } from "next/navigation"


export function OrganizationSwitcher({
  organizations,
  defaultOrganization,
}: {
  organizations: Organization[]
  defaultOrganization: Organization
}) {
  const [selectedOrganization, setSelectedOrganization] = React.useState<Organization>(defaultOrganization)
  const [previousSelectedOrganization, setPreviousSelectedOrganization] = React.useState<Organization>(defaultOrganization)
  const router = useRouter();

  useEffect(() => {
    if(selectedOrganization.slug != previousSelectedOrganization.slug) {
      router.push(`/${selectedOrganization.slug}/dashboard`)
    }
  }, [selectedOrganization, previousSelectedOrganization]);

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                <GalleryVerticalEnd className="size-4" />
              </div>
              <div className="flex flex-col gap-0.5 leading-none">
                <span className="font-semibold">{selectedOrganization.name}</span>
              </div>
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width]"
            align="start"
          >
            {organizations.map((organization) => (
              <DropdownMenuItem
                key={organization.slug}
                onSelect={() => {
                  setPreviousSelectedOrganization(selectedOrganization)
                  setSelectedOrganization(organization)
                }}
              >
                {organization.name}
                {organization === selectedOrganization && <Check className="ml-auto" />}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}