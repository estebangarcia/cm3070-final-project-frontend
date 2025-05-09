import React from 'react';
import { auth } from "@/auth";
import { Heading } from "@/components/ui/heading";
import PageContainer from "@/components/page-container";
import { Separator } from "@/components/ui/separator";
import { notFound } from "next/navigation";
import ManifestCodeBlock from './codeblock';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getManifest } from '@/lib/manifests/api';
import { getArtifactVulnerabilities, getArtifact } from '@/lib/artifacts/api';
import { columns as vulnerability_columns } from './vulnerability_columns';
import { columns as misconfiguration_columns } from './misconfiguration_columns';
import { DataTable } from '@/components/ui/data-table';
import { DeleteArtifactDialog } from './delete_artifact_dialog';

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

  const responses = await Promise.all([
    getArtifact(session?.access_token, organization, registry, repository, decodeURIComponent(digest)),
    getManifest(session?.access_token, organization, registry, repository, decodeURIComponent(digest)),
    getArtifactVulnerabilities(session?.access_token, organization, registry, repository, decodeURIComponent(digest)),
  ]);

  const artifact = responses[0];
  if(!artifact) {
    notFound();
  }

  const manifest = responses[1];
  if(!manifest) {
    notFound();
  }

  const vulnerabilities = responses[2];

  return (
    <PageContainer>
      <div className="space-y-4">
        <div className="flex items-start justify-between">
            <Heading
              title={`${repository}@${decodeURIComponent(digest)} Details`}
              description="Artifact Details"
            />
            <DeleteArtifactDialog organization={organization} registry={registry} repository={repository} manifestDigest={decodeURIComponent(digest)} />
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
        <Separator/>
        {
            (artifact.scanned_at == null || vulnerabilities.vulnerabilities.length > 0) &&
            <Card>
              <CardHeader>
                <CardTitle>Vulnerabilities</CardTitle>
              </CardHeader>
              <CardContent>
                  {
                    artifact.scanned_at == null ? (
                      <div className="text-center">
                        Awaiting Scanning...
                      </div>
                    ) : (
                      <DataTable columns={vulnerability_columns} data={vulnerabilities.vulnerabilities} />
                    )
                  }
              </CardContent>
            </Card>
        }
        {
            (artifact.scanned_at == null || vulnerabilities.misconfigurations.length > 0) &&
            <Card>
              <CardHeader>
                <CardTitle>Misconfigurations</CardTitle>
              </CardHeader>
              <CardContent>
                  {
                    artifact.scanned_at == null ? (
                      <div className="text-center">
                        Awaiting Scanning...
                      </div>
                    ) : (
                      <DataTable columns={misconfiguration_columns} data={vulnerabilities.misconfigurations} />
                    )
                  }
              </CardContent>
            </Card>
        }
      </div> 
    </PageContainer>
  );
}
