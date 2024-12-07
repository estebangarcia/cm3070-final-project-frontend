import { auth } from "@/auth";
import SidebarLayout from "@/components/sidebar_layout";
import { getOrganization } from "@/lib/orgs/api";
import { notFound } from "next/navigation";

export default async function Layout({children, params}: {children: React.ReactNode, params: Promise<{organization: string}>}) {  
  const session = await auth();
  const { organization } = await params;
  
  const org = await getOrganization(session?.access_token, organization)
  if(!org) {
    notFound();
  }

  return (
    <SidebarLayout organization={organization}>
      {children}
    </SidebarLayout>
  );
}
