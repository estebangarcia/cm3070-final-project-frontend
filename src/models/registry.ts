import { Organization } from "./organization";

export interface RegistryEdges {
    organization?: Organization;
}

export interface Registry {
    name: string;
    slug: string;
    edges: RegistryEdges;
}