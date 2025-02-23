import { auth } from "@/auth"
import { Heading } from "@/components/ui/heading";
import PageContainer from "@/components/page-container";
import { Separator } from "@/components/ui/separator";
import { notFound } from "next/navigation";
import { getRepositories } from "@/lib/repositories/api";
import RepositoriesTable from "./data_table";

export interface RegistryScopedProps {
  params: Promise<{ 
      organization: string,
      registry: string
  }>
}

export default async function Repositories({params}: RegistryScopedProps) {
  const session = await auth()
  const { organization, registry } = await params;

  const repositories = await getRepositories(session?.access_token, organization, registry);
  if(!repositories) {
    notFound();
  }
  
  return (
    <PageContainer>
      <div className="space-y-4">
        <div className="flex items-start justify-between">
            <Heading
              title={`Repositories`}
              description="Manage repositories"
            />
        </div>
        <Separator/>
        <RepositoriesTable organization={organization} registry={registry} repositories={repositories} />
      </div>
    </PageContainer>
  );
}
