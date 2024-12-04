import { NextResponse, type NextRequest } from 'next/server'
import { auth } from "@/auth"
import { getOrganizations, getPersonalOrganization } from '@/lib/orgs/api';
 
export async function GET(request: NextRequest) {
    const session = await auth();
    
    let organizations = await getOrganizations(session?.access_token);
    if(organizations == null) {
        return NextResponse.json({"message": "unexpected error"}, {status: 500})
    }
    let personalOrg = getPersonalOrganization(organizations);
    return NextResponse.json(personalOrg)
}