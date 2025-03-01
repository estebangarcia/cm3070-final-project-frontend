"use client";

import { Button } from "@/components/ui/button"
import { Trash } from "lucide-react"
import { useRouter } from "next/navigation";
import { deleteManifest } from "./_api/manifest";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
 
interface DeleteArtifactDialogProps {
    organization: string;
    registry: string;
    repository: string;
    manifestDigest: string;
}
  
export function DeleteArtifactDialog({organization, registry, repository, manifestDigest}: DeleteArtifactDialogProps) {
    const router = useRouter();

    async function onContinue() {
        await deleteManifest(organization, registry, repository, manifestDigest);
        router.replace(`/${organization}/registries/${registry}/repositories/${repository}`)
    }

    return (
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="default" onClick={(e) => e.stopPropagation()}><Trash/> Delete Manifest</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the artifact.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={(e) => e.stopPropagation()}>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={onContinue}>Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
    )
}