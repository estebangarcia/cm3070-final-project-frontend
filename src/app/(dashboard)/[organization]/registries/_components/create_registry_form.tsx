import { z } from "zod"
import slugify from '@sindresorhus/slugify';
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
import { createRegistry } from "../_api/registry";
 
const FormSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required",
  }),
})

interface CreateRegistryFormProps {
  organization: string;
  onSuccessfulSubmit: () => void;
}

export function CreateRegistryForm({organization, onSuccessfulSubmit}: CreateRegistryFormProps) {
  const descriptionRef = useRef<HTMLParagraphElement>(null);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
    },
  })
 
  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const response = await createRegistry(organization, data.name);
    if(response != null) {
      onSuccessfulSubmit();
    }
  }

  function onNameChanged(name: string, description: RefObject<HTMLParagraphElement>) {
    if(description.current == null) {
      return;
    }
    if(name == "") {
      description.current.textContent = "This is the name for your OCI Registry"
      return
    }

    description.current.textContent = `Registry slug: ${slugify(name)}`;
  }

  

  return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    onChangeCapture={e => onNameChanged(e.currentTarget.value, descriptionRef)}
                  />
                </FormControl>
                <FormDescription ref={descriptionRef}>
                  This is the name for your OCI Registry
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <DialogFooter>
            <Button type="submit">Create</Button>
          </DialogFooter>
        </form>
      </Form>
  )
}