"use client"

import { Artifact } from "@/models/artifact"
import { ColumnDef } from "@tanstack/react-table"

const ARTIFACT_TYPE_MAPPING = {
  "application/vnd.python.artifact": "Python",
  "application/vnd.oci.image.config.v1+json": "Container Image",
  "application/vnd.docker.container.image.v1+json": "Container Image",
}

export const columns: ColumnDef<Artifact>[] = [
  {
    accessorKey: "artifact_type",
    header: "Artifact Type",
    cell: ({ row }) => {
      return ARTIFACT_TYPE_MAPPING[row.original.artifact_type as keyof typeof ARTIFACT_TYPE_MAPPING] || "Generic Artifact";
    }
  },
  {
    accessorKey: "digest",
    header: "Manifest Digest",
  },
  {
    accessorKey: "tags",
    header: "Tags",
    cell: ({ row }) => {
      if(row.original.edges.tags == undefined) {
        return "No tags";
      }
      return row.original.edges.tags.map((value) => value.tag).join(", ")
    }
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const artifact = row.original
 
      return (
        "" 
      )
    },
  }
]