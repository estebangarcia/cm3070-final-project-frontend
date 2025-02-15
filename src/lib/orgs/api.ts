import { jwtAuthHeader, apiUrl } from "@/lib/utils"
import { Organization } from "@/models/organization";

export async function getOrganizations(access_token: string | undefined) {
    const res = await fetch(apiUrl("/organizations"), {
        headers: jwtAuthHeader(access_token),
    })
    return res.json()
}

export async function getOrganization(access_token: string | undefined, slug: string) {
    const res = await fetch(apiUrl(`/organizations/${slug}`), {
        headers: jwtAuthHeader(access_token),
    })
    if(!res.ok) {
        return null
    }
    return res.json()
}

export function getPersonalOrganization(organizations: Organization[]): Organization {
	const result = organizations.filter(org => {
		return org.is_personal;
	})
	return result[0]
}
