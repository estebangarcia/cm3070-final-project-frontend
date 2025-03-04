import { NextRequest, NextResponse } from 'next/server'
import { auth } from "@/auth"
import { createOrganization } from '@/lib/orgs/api';
 
interface CreateOrganizationRequest {
    name?: string;
}

export async function POST(request: NextRequest) {
    const session = await auth();

    const createOrganizationRequest = await request.json() as CreateOrganizationRequest

    if(createOrganizationRequest.name == null || createOrganizationRequest.name == "") {
        return NextResponse.json({"error": "name is required"}, {status: 422})
    }

    const resp = await createOrganization(session?.access_token, createOrganizationRequest.name)
    return NextResponse.json(resp)
}