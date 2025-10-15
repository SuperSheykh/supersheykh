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
import { FormButtons } from "@/components/form-buttons";
import { getQuote, upsertQuote } from "actions/quotes";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/dashboard/quotes/$quoteId")({
  loader: ({ params: { quoteId } }) => {
    if (quoteId === "new") return;
    return getQuote({ data: { id: quoteId } });
  },
  shouldReload: false,
  staleTime: Infinity,
  component: RouteComponent,
  pendingComponent: PageLoading,
});

const formSchema = quoteSchema.pick({
  quote: true,
  quote_fr: true,
  author: true,
  live: true,
});

type FormValues = z.infer<typeof formSchema>;

function RouteComponent() {
  const { quoteId } = useParams({ from: "/dashboard/quotes/$quoteId" });
  const isNew = quoteId === "new";
  const navigate = useNavigate();
  const data = useLoaderData({ from: "/dashboard/quotes/$quoteId" });
  const [isPending, setIsPending] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: data
      ? { ...data, live: data.live === "1" ? "1" : "0" }
      : { live: "1" },
  });

  const onSubmit = (values: FormValues) => {
    setIsPending(true);
    toast.promise(
      upsertQuote({ data: { ...values, id: isNew ? undefined : quoteId } }),
      {
        loading: "Submitting...",
        success: () => {
          navigate({ to: "..", replace: true });
          return "Quote updated!";
        },
        error: "Something went wrong!",
        finally: () => setIsPending(false),
      },
    );
  };

  return (
    <Gutter className="space-y-8">
      <PageTitle
        title={data ? "Edit Quote" : "Create Quote"}
        description={data ? "Edit the quote" : "Create a new quote"}
      />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 gap-8">
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
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value === "1"}
                      onCheckedChange={(checked) => {
                        field.onChange(checked ? "1" : "0");
                      }}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Live</FormLabel>
                    <FormDescription>
                      Is this quote live for visitors to see?
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="quote"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Quote</FormLabel>
                <FormControl>
                  <Textarea placeholder="The quote..." {...field} rows={5} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="quote_fr"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Quote (French)</FormLabel>
                <FormControl>
                  <Textarea placeholder="La citation..." {...field} rows={5} />
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
