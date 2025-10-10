import { createFileRoute, useNavigate, useParams } from "@tanstack/react-router";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { z } from "zod";

import { trpc } from "@/lib/utils/trpc";
import { socialSchema } from "@/db/schema/socials";

import PageLoading from "@/components/page-loading";
import PageTitle from "@/components/page-title";
import Gutter from "@/components/gutter";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FormButtons } from "@/components/form-buttons";

export const Route = createFileRoute("/dashboard/socials/socialId")({
  component: RouteComponent,
});

const formSchema = socialSchema.pick({
  name: true,
  url: true,
});

type FormValues = z.infer<typeof formSchema>;

function RouteComponent() {
  const { socialId } = useParams({ from: "/dashboard/socials/$socialId/" });
  const isNew = socialId === "new";
  const navigate = useNavigate();

  const { data, isLoading } = useQuery(
    trpc.socials.get.queryOptions(socialId, { enabled: !isNew })
  );

  const { mutateAsync, isPending } = useMutation(
    trpc.socials.upsert.mutationOptions()
  );

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: data ?? {},
  });

  useEffect(() => {
    if (data) {
      form.reset(data);
    }
  }, [data, form]);

  const onSubmit = (values: FormValues) => {
    toast.promise(mutateAsync({ ...values, id: isNew ? undefined : socialId }), {
      loading: "Submitting...",
      success: () => {
        navigate({ to: "/dashboard/socials" });
        return "Social link updated!";
      },
      error: "Something went wrong!",
    });
  };

  if (isLoading && !isNew) return <PageLoading />;

  return (
    <Gutter className="space-y-8">
      <PageTitle
        title={data ? "Edit Social" : "Create Social"}
        description={data ? "Edit the social link" : "Create a new social link"}
      />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Social Media Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="url"
            render={({ field }) => (
              <FormItem>
                <FormLabel>URL</FormLabel>
                <FormControl>
                  <Input placeholder="https://example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormButtons isPending={isPending} />
        </form>
      </Form>
    </Gutter>
  );
}