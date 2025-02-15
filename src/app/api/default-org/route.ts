import { NextResponse } from 'next/server'
import { auth } from "@/auth"
import { getOrganizations, getPersonalOrganization } from '@/lib/orgs/api';
 
export async function GET() {
    const session = await auth();
    
    const organizations = await getOrganizations(session?.access_token);
    if(organizations == null) {
        return NextResponse.json({"message": "unexpected error"}, {status: 500})
    }
    const personalOrg = getPersonalOrganization(organizations);
    return NextResponse.json(personalOrg)
}