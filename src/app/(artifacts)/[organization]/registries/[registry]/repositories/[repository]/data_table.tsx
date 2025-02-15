"use client";

import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns"
import { useRouter } from "next/navigation";
import { Artifact } from "@/models/artifact";

export interface ArtifactsTableParams {
    artifacts: Artifact[],
    repository: string,
    organization: string,
    registry: string
}

export default function ArtifactsTable(params: ArtifactsTableParams) {  
    const router = useRouter();
    const { repository, organization, registry, artifacts } = params;

    return (
        <DataTable columns={columns} data={artifacts} onRowClick={(row) => router.push(`/${organization}/registries/${registry}/repositories/${repository}/artifacts/${row.digest}`) } />
    );
}
