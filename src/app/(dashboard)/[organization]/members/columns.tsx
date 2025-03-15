"use client"

import { OrganizationMember } from "@/models/organization"
import { ColumnDef } from "@tanstack/react-table"

export const columns: ColumnDef<OrganizationMember>[] = [
  {
    accessorKey: "given_name",
    header: "Name",
    cell: ({ row }) => {
      return row.original.given_name + " " + row.original.family_name
    }
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "role",
    header: "Role",
  },
]