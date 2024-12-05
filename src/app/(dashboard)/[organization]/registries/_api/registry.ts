export async function createRegistry(organizationSlug: string, name: string) {
    const res = await fetch(`/api/${organizationSlug}/registries`, {
        method: "POST",
        body: JSON.stringify({name: name})
    })
    if(!res.ok) {
        return null;
    }
    return res.json()
}