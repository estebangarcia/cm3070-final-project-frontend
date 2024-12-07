import { auth } from "@/auth";
import { getOrganization } from "@/lib/orgs/api";
import { notFound } from "next/navigation";
import { getRegistry } from "@/lib/registries/api";
import SidebarLayout from "@/components/sidebar_layout";


export default async function Layout({children, params}: {children: React.ReactNode, params: Promise<{organization: string, registry: string}>}) {  
  const session = await auth();
  const { organization, registry } = await params;
  
  const org = await getOrganization(session?.access_token, organization)
  if(!org) {
    notFound();
  }

  const reg = await getRegistry(session?.access_token, organization, registry)
  if(!reg) {
    notFound();
  }

  return (
    <SidebarLayout organization={organization} registry={registry}>
      {children}
    </SidebarLayout>
  );
}
