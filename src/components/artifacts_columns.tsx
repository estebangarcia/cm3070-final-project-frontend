"use client"

import { Artifact } from "@/models/artifact"
import { ColumnDef } from "@tanstack/react-table"

const ARTIFACT_TYPE_MAPPING = {
  "application/vnd.cncf.helm.config.v1+json": "Helm Chart",
  "application/vnd.python.artifact": "Python",
  "application/vnd.oci.image.config.v1+json": "Container Image",
  "application/vnd.docker.container.image.v1+json": "Container Image",
}

export const artifactsColumns: ColumnDef<Artifact>[] = [
  {
    accessorKey: "artifact_type",
    header: "Artifact Type",
    cell: ({ row }) => {
      return ARTIFACT_TYPE_MAPPING[row.original.artifact_type as keyof typeof ARTIFACT_TYPE_MAPPING] || "Generic Artifact";
    }
  },
  {
    accessorKey: "edges.repository.edges.registry.name",
    header: "Registry Name",
  },
  {
    accessorKey: "edges.repository.name",
    header: "Repository Name",
  },
  {
    accessorKey: "digest",
    header: "Manifest Digest",
  },
  {
    accessorKey: "uploaded_at",
    header: "Manifest Uploaded At",
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
]