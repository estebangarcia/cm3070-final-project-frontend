import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FolderCode, Database, Package, Server, ShieldX } from "lucide-react";
import { OrganizationScopedProps } from "../interfaces";
import PageContainer from "@/components/page-container";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { getOrganization, getOrganizationStats } from "@/lib/orgs/api";
import { auth } from "@/auth";
import ArtifactsTable from "@/components/artifacts_data_table";
import { Organization, OrganizationStats } from "@/models/organization";
import { getRecentOrgArtifacts } from "@/lib/artifacts/api";

export default async function OrganizationDashboard({params}: OrganizationScopedProps) {
  const { organization } = await params;
  const session = await auth()

  const formatBytes = (bytes: number, decimals = 2) => {
      if (!+bytes) return '0 Bytes'

      const k = 1024
      const dm = decimals < 0 ? 0 : decimals
      const sizes = ['Bytes', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB']

      const i = Math.floor(Math.log(bytes) / Math.log(k))

      return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
  }

  const responses = await Promise.all([
    getOrganization(session?.access_token, organization),
    getOrganizationStats(session?.access_token, organization),
    getRecentOrgArtifacts(session?.access_token, organization)
  ])

  const org = responses[0] as Organization;
  const stats = responses[1] as OrganizationStats;
  const recentArtifacts = responses[2];
  

  return (
      <PageContainer>
        <div className="space-y-4">
          <div className="flex items-start justify-between">
              <Heading
                title={`${org.name} Dashboard`}
                description=""
              />
          </div>
          <Separator/>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            <Card>
              <CardHeader>
                <div className="flex flex-row items-center justify-between space-y-0">
                  <CardTitle>Registries</CardTitle>
                  <Database />
                </div>
                <CardDescription>How many registries the organization has</CardDescription>
              </CardHeader>
              <CardContent>
                <p>{stats.registry_count}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <div className="flex flex-row items-center justify-between space-y-0">
                  <CardTitle>Repositories</CardTitle>
                  <FolderCode />
                </div>
                <CardDescription>How many repositories the organization has</CardDescription>
              </CardHeader>
              <CardContent>
              <p>{stats.repository_count}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <div className="flex flex-row items-center justify-between space-y-0">
                  <CardTitle>Artifacts</CardTitle>
                  <Package/>
                </div>
                <CardDescription>How many artifacts the organization has</CardDescription>
              </CardHeader>
              <CardContent>
              <p>{stats.artifacts_count}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <div className="flex flex-row items-center justify-between space-y-0">
                  <CardTitle>Storage used</CardTitle>
                  <Server/>
                </div>
                <CardDescription>How much storage the organization is using</CardDescription>
              </CardHeader>
              <CardContent>
              <p>{formatBytes(stats.storage_used)}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <div className="flex flex-row items-center justify-between space-y-0">
                  <CardTitle>Vulnerable Artifacts</CardTitle>
                  <ShieldX/>
                </div>
                <CardDescription>How many packages have vulnerabilities</CardDescription>
              </CardHeader>
              <CardContent>
              <p>{stats.vulnerable_artifacts_count}</p>
              </CardContent>
            </Card>
          </div>
          <Separator/>
          <Card>
            <CardHeader>
              <CardTitle>Recent Artifacts</CardTitle>
            </CardHeader>
            <CardContent>
              <ArtifactsTable artifacts={recentArtifacts} organization={org.slug} />
            </CardContent>
          </Card>
        </div>
      </PageContainer>
  );
}
