import {
  createFileRoute,
  useLoaderData,
  useNavigate,
  useParams,
} from "@tanstack/react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { quoteFormSchema } from "@/db/schema/quotes";

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
import { useTranslation } from "react-i18next";
import { useTrans } from "@/hooks/use-trans";

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

type FormValues = z.infer<typeof quoteFormSchema>;

function RouteComponent() {
  const {
    i18n: { language },
  } = useTranslation();
  const t = useTrans();
  const { quoteId } = useParams({ from: "/dashboard/quotes/$quoteId" });
  const isNew = quoteId === "new";
  const navigate = useNavigate();
  const data = useLoaderData({ from: "/dashboard/quotes/$quoteId" });
  const [isPending, setIsPending] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(quoteFormSchema),
    defaultValues: data
      ? { ...data, live: data.live === "1" ? "1" : "0" }
      : { live: "1" },
  });

  useEffect(() => {
    if (language === "fr") form.setValue("lang", "fr");
    else form.setValue("lang", "en");
  }, [language, form]);

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
        title={t(
          data ? "Edit Quote" : "Create Quote",
          data ? "Modifier la citation" : "Créer une citation",
        )}
        description={t(
          data ? "Edit the quote" : "Create a new quote",
          data ? "Modifier la citation" : "Créer une nouvelle citation",
        )}
      />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 gap-8">
            <FormField
              control={form.control}
              name="author"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("Author", "Auteur")}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t("Quote Author", "Auteur de la citation")}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="quote"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("Quote", "Citation")}</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder={t("The quote...", "La citation...")}
                      {...field}
                      rows={5}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="live"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-none border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value === "1"}
                      onCheckedChange={(checked) => {
                        field.onChange(checked ? "1" : "0");
                      }}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>{t("Live", "En direct")}</FormLabel>
                    <FormDescription>
                      {t(
                        "Is this quote live for visitors to see?",
                        "Cette citation est-elle visible par les visiteurs ?",
                      )}
                    </FormDescription>
                  </div>
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
