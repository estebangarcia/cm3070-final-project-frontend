import React from 'react';
import { auth } from "@/auth";
import { Heading } from "@/components/ui/heading";
import PageContainer from "@/components/page-container";
import { Separator } from "@/components/ui/separator";
import { notFound } from "next/navigation";
import ManifestCodeBlock from './codeblock';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getManifest } from '@/lib/manifests/api';

export interface ArtifactScopedProps {
  params: Promise<{ 
      organization: string,
      registry: string,
      repository: string
      digest: string
  }>
}

export default async function ArtifactDetails({params}: ArtifactScopedProps) {
  const session = await auth()
  const { organization, registry, repository, digest } = await params;

  const manifest = await getManifest(session?.access_token, organization, registry, repository, decodeURIComponent(digest));
  if(!manifest) {
    notFound();
  }

  const tags = ["v1.0.0"]

  return (
    <PageContainer>
      <div className="space-y-4">
        <div className="flex items-start justify-between">
            <Heading
              title={`${repository}@${decodeURIComponent(digest)} Details`}
              description="Artifact Details"
            />
        </div>
        <Separator/>
        <Card>
          <CardHeader>
            <CardTitle>Manifest</CardTitle>
          </CardHeader>
          <CardContent>
            <ManifestCodeBlock manifestJson={JSON.stringify(manifest, null, 2)} />
          </CardContent>
        </Card>
      </div> 
    </PageContainer>
  );
}
