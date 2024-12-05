import { NextRequest, NextResponse } from 'next/server'
import { auth } from "@/auth"
import { getOrganizations, getPersonalOrganization } from '@/lib/orgs/api';
import { createRegistry } from '@/lib/registries/api';
 
interface CreateRegistryRequest {
    name?: string;
}

interface CreateRegistryParams {
    params: { organization: string };
}

export async function POST(request: NextRequest, { params } : CreateRegistryParams) {
    const { organization } = await params;
    const session = await auth();

    const createRegistryRequest = await request.json() as CreateRegistryRequest

    if(createRegistryRequest.name == null || createRegistryRequest.name == "") {
        return NextResponse.json({"error": "name is required"}, {status: 422})
    }

    const resp = await createRegistry(session?.access_token, organization, createRegistryRequest.name)
    return NextResponse.json(resp)
}