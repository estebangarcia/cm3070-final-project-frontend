"use client"

import { Repository } from "@/models/repository"
import { ColumnDef } from "@tanstack/react-table"

export const columns: ColumnDef<Repository>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
]