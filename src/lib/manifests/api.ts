import { jwtAuthHeader, ociApiUrl } from "@/lib/utils"

export async function getManifest(access_token: string | undefined, organizationSlug: string, registrySlug: string, repository: string, digestOrTag: string) {
    const res = await fetch(ociApiUrl(`/${organizationSlug}/${registrySlug}/${repository}/manifests/${digestOrTag}`), {
        headers: jwtAuthHeader(access_token),
    })
    return res.json()
}