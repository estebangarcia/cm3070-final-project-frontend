"use client";

import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns"
import { Repository } from "@/models/repository";
import { useRouter } from "next/navigation";

export interface RepositoryTableParams {
    repositories: Repository[],
    organization: string,
    registry: string
}

export default function RepositoriesTable(params: RepositoryTableParams) {  
    const router = useRouter();
    const { repositories, organization, registry } = params;

    return (
        <DataTable columns={columns} data={repositories} onRowClick={(row) => router.push(`/${organization}/registries/${registry}/repositories/${row.name}`) } />
    );
}
