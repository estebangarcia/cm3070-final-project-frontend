export interface Misconfiguration {
    misconfiguration_id: string;
    misconfiguration_url_details: string;
    title: string;
    severity: string;
}

export interface ManifestMisconfigurationEdges {
    misconfiguration: Misconfiguration;
}

export interface ManifestMisconfiguration {
    target_file: string;
    message: string;
    resolution: string;
    edges: ManifestMisconfigurationEdges;
}