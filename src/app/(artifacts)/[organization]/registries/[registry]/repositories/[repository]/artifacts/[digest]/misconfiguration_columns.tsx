"use client"

import { Badge, Variant } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ManifestMisconfiguration } from "@/models/misconfiguration"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import { SEVERITY_BADGE_MAPPING } from "./vulnerability_columns"


export const columns: ColumnDef<ManifestMisconfiguration>[] = [
  {
    accessorKey: "edges.misconfiguration.misconfiguration_id",
    header: "Misconfiguration ID",
  },
  {
    accessorKey: "edges.misconfiguration.title",
    header: "Title",
  },
  {
    accessorKey: "edges.misconfiguration.severity",
    cell: ({ row }) => {
      const badgeVariant = SEVERITY_BADGE_MAPPING[row.original.edges.misconfiguration.severity as keyof typeof SEVERITY_BADGE_MAPPING];
      return (
        <Badge variant={badgeVariant as Variant}>{row.original.edges.misconfiguration.severity}</Badge>
      )
    },
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Severity
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "target_file",
    header: "Target File",
  },
  {
    accessorKey: "message",
    header: "Message",
  },
  {
    accessorKey: "resolution",
    header: "Resolution",
  },
  {
    accessorKey: "edges.misconfiguration.misconfiguration_url_details",
    header: "URL Details",
  },
]