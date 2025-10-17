import {
  createFileRoute,
  useLoaderData,
  useNavigate,
} from "@tanstack/react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { getBillboard } from "actions/billboards";
import PageLoading from "@/components/page-loading";
import { billboardFormSchema } from "@/db/schema/billboards";
import ImageUploader from "@/components/image-uploader";
import { trpc } from "@/router";
import { useMutation } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { useTrans } from "@/hooks/use-trans";

export const Route = createFileRoute("/dashboard/billboards/$billboardId")({
  loader: ({ params: { billboardId } }) =>
    getBillboard({ data: { id: billboardId } }),
  component: RouteComponent,
  pendingComponent: PageLoading,
});

type FormValues = z.infer<typeof billboardFormSchema>;

function RouteComponent() {
  const {
    i18n: { language },
  } = useTranslation();
  const t = useTrans();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const data =
    useLoaderData({ from: "/dashboard/billboards/$billboardId" }) ?? {};

  const { mutateAsync: upsertBillboard } = useMutation(
    trpc.billboards.upsert.mutationOptions(),
  );

  const form = useForm<FormValues>({
    resolver: zodResolver(billboardFormSchema),
    defaultValues: data,
  });

  useEffect(() => {
    if (language === "fr") form.setValue("lang", "fr");
    else form.setValue("lang", "en");
  }, [language, form]);

  const onSubmit = (values: FormValues) => {
    setLoading(true);
    toast.promise(upsertBillboard(values), {
      loading: "Submitting...",
      success: () => {
        navigate({ to: "..", replace: true });
        return "Billboard updated!";
      },
      error: "Something went wrong!",
      finally: () => setLoading(false),
    });
  };

  return (
    <Gutter className="space-y-4">
      <PageTitle
        title={data.id ? "Edit" : "Create"}
        description={data.id ? "Edit the billboard" : "Create a new billboard"}
        separator
      />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FormField
              control={form.control}
              name="greeting"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("Greeting", "Salutation")}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t("Hello there", "Bonjour")}
                      {...field}
                      value={field.value ?? ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("Title", "Titre")}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t(
                        "Welcome to my portfolio",
                        "Bienvenue sur mon portfolio",
                      )}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("Description", "Description")}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t("Short description", "Description courte")}
                      {...field}
                      value={field.value ?? ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="buttonText"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("Button Text", "Texte du bouton")}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t("Click me", "Cliquez-moi")}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="subText"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("Sub Text", "Sous-texte")}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t("Some subtext", "Un peu de sous-texte")}
                      {...field}
                      value={field.value ?? ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="buttonLink"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("Button Link", "Lien du bouton")}</FormLabel>
                  <FormControl>
                    <Input placeholder="/contact" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="subLink"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("Sub Link", "Sous-lien")}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="/about"
                      {...field}
                      value={field.value ?? ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="subLinkText"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {t("Sub Link Text", "Texte du sous-lien")}
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t("Read more", "Lire la suite")}
                      {...field}
                      value={field.value ?? ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="imageKey"
              render={({ field }) => (
                <FormItem className="col-span-full">
                  <FormLabel>{t("Image", "Image")}</FormLabel>
                  <FormControl>
                    <ImageUploader
                      value={field.value ?? undefined}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormDescription>
                    {t(
                      "Better choose a square image with a transparent background.",
                      "Il est préférable de choisir une image carrée avec un fond transparent.",
                    )}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormButtons isPending={loading} />
        </form>
      </Form>
    </Gutter>
  );
}
