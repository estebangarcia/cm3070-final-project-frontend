"use client";

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Plus } from "lucide-react"
import { CreateRegistryForm } from "./create_registry_form"
import { useState } from "react";
import { useRouter } from "next/navigation";
 
interface CreateRegistryDialogProps {
    organization: string;
}
  
export function CreateRegistryDialog({organization}: CreateRegistryDialogProps) {
    const [dialogOpen, setDialogOpen] = useState(false);
    const router = useRouter();

    const onSuccessfulSubmit = () => {
        setDialogOpen(false);
        router.refresh();
    }

    return (
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
                <Button variant="default"><Plus className="h-4 w-4" />Create New</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Create Registry</DialogTitle>
                    <DialogDescription>
                    This will create a new OCI Registry within your organization
                    </DialogDescription>
                </DialogHeader>
                <CreateRegistryForm organization={organization} onSuccessfulSubmit={onSuccessfulSubmit}  />
            </DialogContent>
        </Dialog>
    )
}