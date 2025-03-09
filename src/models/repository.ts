import { Registry } from "./registry";

export interface RepositoryEdges {
    registry?: Registry;
}

export interface Repository {
    name: string;
    edges: RepositoryEdges;
}