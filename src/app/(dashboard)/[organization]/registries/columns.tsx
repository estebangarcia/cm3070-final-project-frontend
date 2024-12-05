"use client"

import { Registry } from "@/models/registry"
import { ColumnDef } from "@tanstack/react-table"

export const columns: ColumnDef<Registry>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "slug",
    header: "Slug",
  }
]