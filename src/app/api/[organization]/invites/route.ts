import { NextRequest, NextResponse } from 'next/server'
import { auth } from "@/auth"
import { acceptOrganizationInvite, inviteMemberToOrganization } from '@/lib/invites/api';

interface InviteMemberRequest {
    email: string;
    role: string;
}

interface InviteMemberParams {
    params: Promise<{
        organization: string;
    }>;
}

export async function POST(request: NextRequest, { params } : InviteMemberParams) {
    const { organization } = await params;
    const session = await auth();

    const inviteMemberRequest = await request.json() as InviteMemberRequest

    const accepted = await inviteMemberToOrganization(session?.access_token, organization, inviteMemberRequest.email, inviteMemberRequest.role)
    if(accepted) {
        return new NextResponse(null, {status: 204});
    }
    return NextResponse.json({"error": "Error accepting invitation"}, {status: 500});
}