import { jwtAuthHeader, apiUrl } from "@/lib/utils"

export async function getRepositories(access_token: string | undefined, organizationSlug: string, registrySlug: string) {
    const res = await fetch(apiUrl(`/organizations/${organizationSlug}/registries/${registrySlug}/repositories`), {
        headers: jwtAuthHeader(access_token),
    })
    return res.json()
}

export async function getRepository(access_token: string | undefined, organizationSlug: string, registrySlug: string, repository: string) {
    const res = await fetch(apiUrl(`/organizations/${organizationSlug}/registries/${registrySlug}/repositories/${repository}`), {
        headers: jwtAuthHeader(access_token),
    })
    return res.json()
}