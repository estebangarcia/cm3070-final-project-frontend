export async function deleteManifest(organizationSlug: string, registrySlug: string, repository: string, manifestDigest: string) {
    const res = await fetch(`/api/${organizationSlug}/${registrySlug}/${repository}/manifests/${manifestDigest}`, {
        method: "DELETE",
    })
    if(!res.ok) {
        return false;
    }
    return true;
}