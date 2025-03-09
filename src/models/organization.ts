export interface Organization {
    name: string;
    slug: string;
    is_personal: boolean;
}

export interface OrganizationStats {
    registry_count: number;
    repository_count: number;
    artifacts_count: number;
    storage_used: number;
    vulnerable_artifacts_count: number;
}