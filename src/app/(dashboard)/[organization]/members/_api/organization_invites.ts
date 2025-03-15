export async function inviteMember(organizationSlug: string, email: string, role: string) {
    const res = await fetch(`/api/${organizationSlug}/invites`, {
        method: "POST",
        body: JSON.stringify({email: email, role: role})
    })
    if(!res.ok) {
        return false;
    }
    return true;
}