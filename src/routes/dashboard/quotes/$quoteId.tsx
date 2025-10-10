import { createFileRoute, useNavigate, useParams } from "@tanstack/react-router";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { z } from "zod";

import { trpc } from "@/lib/utils/trpc";
import { quoteSchema } from "@/db/schema/quotes";

import PageLoading from "@/components/page-loading";
import PageTitle from "@/components/page-title";
import Gutter from "@/components/gutter";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { FormButtons } from "@/components/form-buttons";

export const Route = createFileRoute("/dashboard/quotes/$quoteId")({
  component: RouteComponent,
});

const formSchema = quoteSchema.pick({
  author: true,
  live: true,
});

type FormValues = z.infer<typeof formSchema>;

function RouteComponent() {
  const { quoteId } = useParams({ from: "/dashboard/quotes/$quoteId" });
  const isNew = quoteId === "new";
  const navigate = useNavigate();

  const { data, isLoading } = useQuery(
    trpc.quotes.get.queryOptions(quoteId, { enabled: !isNew })
  );

  const { mutateAsync, isPending } = useMutation(
    trpc.quotes.upsert.mutationOptions()
  );

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: data ?? { live: "1" },
  });

  useEffect(() => {
    if (data) {
      form.reset(data);
    }
  }, [data, form]);

  const onSubmit = (values: FormValues) => {
    toast.promise(mutateAsync({ ...values, id: isNew ? undefined : quoteId }), {
      loading: "Submitting...",
      success: () => {
        navigate({ to: "/dashboard/quotes" });
        return "Quote updated!";
      },
      error: "Something went wrong!",
    });
  };

  if (isLoading && !isNew) return <PageLoading />;

  return (
    <Gutter className="space-y-8">
      <PageTitle
        title={data ? "Edit Quote" : "Create Quote"}
        description={data ? "Edit the quote" : "Create a new quote"}
      />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="author"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Author</FormLabel>
                <FormControl>
                  <Input placeholder="Quote Author" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="live"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
                <FormControl>
                  <Checkbox
                    checked={field.value === "1"}
                    onCheckedChange={(checked) =>
                      field.onChange(checked ? "1" : "0")
                    }
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Live</FormLabel>
                  <FormDescription>
                    Should this quote be displayed on the site?
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />
          <FormButtons isPending={isPending} />
        </form>
      </Form>
    </Gutter>
  );
}