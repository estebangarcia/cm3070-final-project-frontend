import { jwtAuthHeader, apiUrl } from "@/lib/utils"

export async function getRegistry(access_token: string | undefined, organizationSlug: string, registrySlug: string) {
    const res = await fetch(apiUrl(`/organizations/${organizationSlug}/registries/${registrySlug}`), {
        headers: jwtAuthHeader(access_token),
    })
    return res.json()
}

export async function getRegistries(access_token: string | undefined, organizationSlug: string) {
    const res = await fetch(apiUrl(`/organizations/${organizationSlug}/registries`), {
        headers: jwtAuthHeader(access_token),
    })
    return res.json()
}

export async function createRegistry(access_token: string | undefined, organizationSlug: string, name: string) {
    const res = await fetch(apiUrl(`/organizations/${organizationSlug}/registries`), {
        method: "POST",
        headers: jwtAuthHeader(access_token),
        body: JSON.stringify({name: name})
    })
    return res.json()
}