"use client";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { Organization } from "@/models/organization";
import { notFound, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    fetch('/api/default-org')
      .then(async (res) => {
        let org = (await res.json()) as Organization;
        router.push(`/${org.slug}/dashboard`)
      })
      .catch((error) => {
        notFound();
      })
  }, [])

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
          <LoadingSpinner/>
      </main>
    </div>
  );
}
