import { auth } from "@/auth"
import { Heading } from "@/components/ui/heading";
import PageContainer from "@/components/page-container";
import { Separator } from "@/components/ui/separator";
import { notFound } from "next/navigation";
import { getArtifacts } from "@/lib/artifacts/api";
import ArtifactsTable from "./data_table";

export interface RegistryScopedProps {
  params: Promise<{ 
      organization: string,
      registry: string,
      repository: string
  }>
}

export default async function RepositoryArtifacts({params}: RegistryScopedProps) {
  const session = await auth()
  const { organization, registry, repository } = await params;

  const artifacts = await getArtifacts(session?.access_token, organization, registry, repository);
  if(!artifacts) {
    notFound();
  }
  
  return (
    <PageContainer>
      <div className="space-y-4">
        <div className="flex items-start justify-between">
            <Heading
              title={`${repository} Artifacts`}
              description="Manage Artifacts"
            />
        </div>
        <Separator/>
        <ArtifactsTable organization={organization} registry={registry} artifacts={artifacts} repository={repository} />
      </div>
    </PageContainer>
  );
}
