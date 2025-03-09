import { jwtAuthHeader, apiUrl } from "@/lib/utils"

export async function getRecentOrgArtifacts(access_token: string | undefined, organizationSlug: string) {
    const res = await fetch(apiUrl(`/organizations/${organizationSlug}/artifacts`), {
        headers: jwtAuthHeader(access_token),
    })
    return res.json()
}

export async function getArtifacts(access_token: string | undefined, organizationSlug: string, registrySlug: string, repository: string) {
    const res = await fetch(apiUrl(`/organizations/${organizationSlug}/registries/${registrySlug}/repositories/${repository}/artifacts`), {
        headers: jwtAuthHeader(access_token),
    })
    return res.json()
}

export async function getArtifact(access_token: string | undefined, organizationSlug: string, registrySlug: string, repository: string, digest: string) {
    const res = await fetch(apiUrl(`/organizations/${organizationSlug}/registries/${registrySlug}/repositories/${repository}/artifacts/${digest}`), {
        headers: jwtAuthHeader(access_token),
    })
    return res.json()
}


export async function getArtifactVulnerabilities(access_token: string | undefined, organizationSlug: string, registrySlug: string, repository: string, digest: string) {
    const res = await fetch(apiUrl(`/organizations/${organizationSlug}/registries/${registrySlug}/repositories/${repository}/artifacts/${digest}/vulnerabilities`), {
        headers: jwtAuthHeader(access_token),
    })
    return res.json()
}