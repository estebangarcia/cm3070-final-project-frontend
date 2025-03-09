"use client";

import { DataTable } from "@/components/ui/data-table";
import { artifactsColumns } from "./artifacts_columns"
import { useRouter } from "next/navigation";
import { Artifact } from "@/models/artifact";

export interface ArtifactsTableParams {
    artifacts: Artifact[],
    organization: string,
    repository?: string,
    registry?: string
}

export default function ArtifactsTable(params: ArtifactsTableParams) {  
    const router = useRouter();
    const { repository, organization, registry, artifacts } = params;

    const onRowClick = (row: Artifact) => {
        if(registry != null && repository != null) {
            router.push(`/${organization}/registries/${registry}/repositories/${repository}/artifacts/${row.digest}`);
            return;
        }

        if(row.edges.repository?.name != null && row.edges.repository?.edges.registry?.slug != null) {
            router.push(`/${organization}/registries/${row.edges.repository?.edges.registry?.slug}/repositories/${row.edges.repository?.name}/artifacts/${row.digest}`);
        }
        
    };

    return (
        <DataTable columns={artifactsColumns} data={artifacts} onRowClick={onRowClick} />
    );
}
