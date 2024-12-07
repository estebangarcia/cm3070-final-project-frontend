import { auth } from "@/auth"
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import PageContainer from "@/components/page-container";
import { Separator } from "@/components/ui/separator";
import { columns } from "./columns"
import { notFound } from "next/navigation";
import { getRepositories } from "@/lib/repositories/api";

export interface RegistryScopedProps {
  params: { 
      organization: string,
      registry: string
  }
}

export default async function Repositories({params}: RegistryScopedProps) {
  const session = await auth()
  const { organization } = await params;
  const { registry } = await params;

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
        <DataTable columns={columns} data={repositories} />
      </div>
    </PageContainer>
  );
}
