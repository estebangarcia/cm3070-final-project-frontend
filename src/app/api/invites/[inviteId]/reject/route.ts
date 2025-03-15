import { NextRequest, NextResponse } from 'next/server'
import { auth } from "@/auth"
import { rejectOrganizationInvite } from '@/lib/invites/api';
import { InviteActions } from '../accept/route';

export async function POST(request: NextRequest, { params } : InviteActions) {
    const { inviteId } = await params;
    const session = await auth();

    const accepted = await rejectOrganizationInvite(session?.access_token, inviteId)
    if(accepted) {
        return new NextResponse(null, {status: 204});
    }
    return NextResponse.json({"error": "Error rejecting invitation"}, {status: 500});
}