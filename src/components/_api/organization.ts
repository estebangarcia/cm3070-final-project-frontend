export async function createOrganization(name: string) {
    const res = await fetch(`/api/organizations`, {
        method: "POST",
        body: JSON.stringify({name: name})
    })
    if(!res.ok) {
        return null;
    }
    return res.json()
}