import { auth } from "@/auth"
import { OrganizationScopedProps } from "../interfaces";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns"
import { getRegistries } from "@/lib/registries/api";
import { Heading } from "@/components/ui/heading";
import PageContainer from "@/components/page-container";
import { Separator } from "@/components/ui/separator";
import { CreateRegistryDialog } from "./_components/create_registry_dialog";

export default async function Registries({params}: OrganizationScopedProps) {
  const session = await auth()
  const { organization } = await params;
  const registries = await getRegistries(session?.access_token, organization);

  return (
    <PageContainer>
      <div className="space-y-4">
        <div className="flex items-start justify-between">
            <Heading
              title={`Registries`}
              description="Manage registries"
            />
            <CreateRegistryDialog organization={organization} />
        </div>
        <Separator/>
        <DataTable columns={columns} data={registries} />
      </div>
    </PageContainer>
  );
}
