import { z } from "zod"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { DialogFooter } from "@/components/ui/dialog"
import { RefObject, useRef } from "react";
import { inviteMember } from "../_api/organization_invites";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
 
const FormSchema = z.object({
  email: z.string().min(1, {
    message: "Email is required",
  }),
  role: z.enum(["member", "manager", "admin"]),
})

interface InviteMemberFormProps {
  organization: string;
  onSuccessfulSubmit: () => void;
}

export function InviteMemberForm({organization, onSuccessfulSubmit}: InviteMemberFormProps) {
  const descriptionRef = useRef<HTMLParagraphElement>(null);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      role: undefined,
    },
  })
 
  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const response = await inviteMember(organization, data.email, data.role);
    console.log(response);
    if(response) {
      onSuccessfulSubmit();
    }
  }  

  return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>E-Mail</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                  />
                </FormControl>
                <FormDescription ref={descriptionRef}>
                  This is the email of the person you want to invite
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Organization Role</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="manager">Manager</SelectItem>
                    <SelectItem value="member">Member</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  This is the role the user will have in your organizaxtion
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <DialogFooter>
            <Button type="submit">Invite</Button>
          </DialogFooter>
        </form>
      </Form>
  )
}