"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Mail } from "lucide-react";
import { Card, CardDescription, CardFooter, CardHeader } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { OrganizationInvite } from "@/models/organization";
import { acceptInvite, rejectInvite } from "./_api/organization_invite";
import { useRouter } from "next/navigation";
import React from "react";


export default function OrganizationInvitesPopover({invites}: {
  invites: OrganizationInvite[],
}) {

  const [currentInvites, setCurrentInvites] = React.useState(invites);

  const router = useRouter();

  const acceptInviteOnClick = (invite: OrganizationInvite) => {
    return async () => {
      const result = await acceptInvite(invite.invite_id);
      if(result) {
        setCurrentInvites(currentInvites.filter((currentInvite) => {
          return currentInvite.invite_id !== invite.invite_id
        }));
        router.replace(`/${invite.edges.organization?.slug}/dashboard`)
      }
    }
  };

  const rejectInviteOnClick = (invite: OrganizationInvite) => {
    return async () => {
      const result = await rejectInvite(invite.invite_id);
      if(result) {
        setCurrentInvites(currentInvites.filter((currentInvite) => {
          return currentInvite.invite_id !== invite.invite_id
        }));
      }
    }
  };
  
  return (
    <Popover>
      <PopoverTrigger className="w-full sm:ml-auto sm:w-auto">
        <Mail className="h-5 w-5"/>
        {
          currentInvites.length > 0 ? (
            <Badge className="absolute p-1 h-3 top-4 right-6 rounded-full bg-red-500 text-white text-[11px]">{currentInvites.length}</Badge>
          ) : ""
        }
      </PopoverTrigger>
      <PopoverContent className="mr-8 mt-1">
        {
          currentInvites.length > 0 ?
          currentInvites.map((invite) => (
            <Card className="w-auto" key={invite.invite_id}>
              <CardHeader>
                <CardDescription className="text-white">You&apos;ve been invited to join the organization &quot;{invite.edges.organization?.name}&quot; as {invite.role}</CardDescription>
              </CardHeader>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={rejectInviteOnClick(invite)}>Reject</Button>
                <Button onClick={acceptInviteOnClick(invite)}>Accept</Button>
              </CardFooter>
            </Card>
          )) : (
            <div className="text-center">
              You have no pending invitiations
            </div>
          )
        }
      </PopoverContent>
    </Popover>
  );
}
