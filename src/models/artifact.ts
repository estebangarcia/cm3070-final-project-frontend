export interface ArtifactTags {
    tag: string;
}

export interface ArtifactEdges {
    tags: ArtifactTags[];
}

export interface Artifact {
    artifact_type: string;
    digest: string;
    edges: ArtifactEdges;
}