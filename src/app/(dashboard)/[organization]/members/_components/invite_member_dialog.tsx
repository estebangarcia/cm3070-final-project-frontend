"use client";

import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Plus } from "lucide-react"
import { InviteMemberForm } from "./invite_member_form"
import { useState } from "react";
 
interface InviteMemberDialogProps {
    organization: string;
}
  
export function InviteMemberDialog({organization}: InviteMemberDialogProps) {
    const [dialogOpen, setDialogOpen] = useState(false);

    const onSuccessfulSubmit = () => {
        setDialogOpen(false);
        toast("Invitation sent");
    }

    return (
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
                <Button variant="default"><Plus className="h-4 w-4" />Invite</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Invite to Organization</DialogTitle>
                    <DialogDescription>
                    This will send an invitation to your organization
                    </DialogDescription>
                </DialogHeader>
                <InviteMemberForm organization={organization} onSuccessfulSubmit={onSuccessfulSubmit}  />
            </DialogContent>
        </Dialog>
    )
}