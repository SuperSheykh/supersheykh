import {
  createFileRoute,
  useLoaderData,
  useNavigate,
  useParams,
} from "@tanstack/react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import { toast } from "sonner";

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
import { getSocial, upsertSocial } from "actions/socials";

export const Route = createFileRoute("/dashboard/socials/$socialId")({
  loader: ({ params: { socialId } }) => {
    if (socialId === "new") return;
    return getSocial({ data: { id: socialId } });
  },
  shouldReload: false,
  staleTime: Infinity,
  component: RouteComponent,
  pendingComponent: PageLoading,
});

const formSchema = socialSchema.pick({
  name: true,
  url: true,
});

type FormValues = z.infer<typeof formSchema>;

function RouteComponent() {
  const { socialId } = useParams({ from: "/dashboard/socials/$socialId" });
  const isNew = socialId === "new";
  const navigate = useNavigate();
  const data = useLoaderData({ from: "/dashboard/socials/$socialId" });
  const [isPending, setIsPending] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: data ?? {},
  });

  const onSubmit = (values: FormValues) => {
    setIsPending(true);
    toast.promise(
      upsertSocial({ data: { ...values, id: isNew ? undefined : socialId } }),
      {
        loading: "Submitting...",
        success: () => {
          navigate({ to: "/dashboard/socials" });
          return "Social link updated!";
        },
        error: "Something went wrong!",
        finally: () => setIsPending(false),
      },
    );
  };

  return (
    <Gutter className="space-y-8">
      <PageTitle
        title={data ? "Edit Social" : "Create Social"}
        description={data ? "Edit the social link" : "Create a new social link"}
      />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Social Name" {...field} />
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
          </div>
          <FormButtons isPending={isPending} />
        </form>
      </Form>
    </Gutter>
  );
}

