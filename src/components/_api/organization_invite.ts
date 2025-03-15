export async function acceptInvite(inviteId: string) {
    const res = await fetch(`/api/invites/${inviteId}/accept`, {
        method: "POST",
    })
    if(!res.ok) {
        return false;
    }
    return true;
}

export async function rejectInvite(inviteId: string) {
    const res = await fetch(`/api/invites/${inviteId}/reject`, {
        method: "POST",
    })
    if(!res.ok) {
        return false;
    }
    return true;
}