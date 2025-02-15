import { jwtAuthHeader, apiUrl } from "@/lib/utils"

export async function getArtifacts(access_token: string | undefined, organizationSlug: string, registrySlug: string, repository: string) {
    const res = await fetch(apiUrl(`/organizations/${organizationSlug}/registries/${registrySlug}/repositories/${repository}/artifacts`), {
        headers: jwtAuthHeader(access_token),
    })
    return res.json()
}