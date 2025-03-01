import { jwtAuthHeader, ociApiUrl } from "@/lib/utils"

export async function getManifest(access_token: string | undefined, organizationSlug: string, registrySlug: string, repository: string, digestOrTag: string) {
    const res = await fetch(ociApiUrl(`/${organizationSlug}/${registrySlug}/${repository}/manifests/${digestOrTag}`), {
        headers: jwtAuthHeader(access_token),
    })
    return res.json()
}

export async function deleteManifest(access_token: string | undefined, organizationSlug: string, registrySlug: string, repository: string, manifestDigest: string) {
    const res = await fetch(ociApiUrl(`/${organizationSlug}/${registrySlug}/${repository}/manifests/${manifestDigest}`), {
        headers: jwtAuthHeader(access_token),
        method: "DELETE",
    })
    if(!res.ok) {
        return false;
    }
    return true;
}