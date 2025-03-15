import { Repository } from "./repository";

export interface ArtifactTags {
    tag: string;
}

export interface ArtifactEdges {
    tags: ArtifactTags[];
    repository?: Repository;
}

export interface Artifact {
    artifact_type: string;
    digest: string;
    edges: ArtifactEdges;
}