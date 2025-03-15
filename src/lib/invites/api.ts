import { jwtAuthHeader, apiUrl } from "@/lib/utils"

export async function getOrganizationInvites(access_token: string | undefined) {
    const res = await fetch(apiUrl(`/invites`), {
        headers: jwtAuthHeader(access_token),
    })
    return res.json()
}

export async function inviteMemberToOrganization(access_token: string | undefined, organizationSlug: string, email: string, role: string) {
    const res = await fetch(apiUrl(`/organizations/${organizationSlug}/members`), {
        headers: jwtAuthHeader(access_token),
        method: "POST",
        body: JSON.stringify({email: email, role: role})
    })
    if(!res.ok) {
        return false;
    }
    return true;
}


export async function acceptOrganizationInvite(access_token: string | undefined, inviteId: string) {
    const res = await fetch(apiUrl(`/invites/${inviteId}/accept`), {
        headers: jwtAuthHeader(access_token),
        method: "POST",
    })
    if(!res.ok) {
        return false;
    }
    return true;
}

export async function rejectOrganizationInvite(access_token: string | undefined, inviteId: string) {
    const res = await fetch(apiUrl(`/invites/${inviteId}/reject`), {
        headers: jwtAuthHeader(access_token),
        method: "POST",
    })
    if(!res.ok) {
        return false;
    }
    return true;
}