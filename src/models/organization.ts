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

export interface OrganizationMember {
    given_name: string;
    family_name: string;
    email: string;
    role: string;
}

export interface OrganizationInviteEdges{
    organization?: Organization;
}

export interface OrganizationInvite {
    invite_id: string;
    role: string;
    edges: OrganizationInviteEdges;
}