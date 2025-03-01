import { NextRequest, NextResponse } from 'next/server'
import { auth } from "@/auth"
import { deleteManifest } from '@/lib/manifests/api';

interface DeleteManifestParams {
    params: Promise<{
        organization: string;
        registry: string;
        repository: string;
        reference: string;
    }>;
}

export async function DELETE(request: NextRequest, { params } : DeleteManifestParams) {
    const { organization, registry, repository, reference } = await params;
    const session = await auth();

    const deleted = await deleteManifest(session?.access_token, organization, registry, repository, reference)
    if(deleted) {
        return new NextResponse(null, {status: 204});
    }
    return NextResponse.json({"error": "Error deleting manifest"}, {status: 500});
}