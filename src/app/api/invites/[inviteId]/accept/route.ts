import { NextRequest, NextResponse } from 'next/server'
import { auth } from "@/auth"
import { acceptOrganizationInvite } from '@/lib/invites/api';

export interface InviteActions {
    params: Promise<{
        inviteId: string;
    }>;
}

export async function POST(request: NextRequest, { params } : InviteActions) {
    const { inviteId } = await params;
    const session = await auth();

    const accepted = await acceptOrganizationInvite(session?.access_token, inviteId)
    if(accepted) {
        return new NextResponse(null, {status: 204});
    }
    return NextResponse.json({"error": "Error accepting invitation"}, {status: 500});
}