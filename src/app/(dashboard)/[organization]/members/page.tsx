import { auth } from "@/auth"
import { OrganizationScopedProps } from "../interfaces";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns"
import { Heading } from "@/components/ui/heading";
import PageContainer from "@/components/page-container";
import { Separator } from "@/components/ui/separator";
import { InviteMemberDialog } from "./_components/invite_member_dialog";
import { getOrganizationMembers } from "@/lib/orgs/api";

export default async function OrganizationMembers({params}: OrganizationScopedProps) {
  const session = await auth()
  const { organization } = await params;
  const members = await getOrganizationMembers(session?.access_token, organization);

  return (
    <PageContainer>
      <div className="space-y-4">
        <div className="flex items-start justify-between">
            <Heading
              title={`Organization Members`}
              description="Manage members"
            />
            <InviteMemberDialog organization={organization} />
        </div>
        <Separator/>
        <DataTable columns={columns} data={members} />
      </div>
    </PageContainer>
  );
}
