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
import { NumericFormat } from "react-number-format";
import { Textarea } from "@/components/ui/textarea";
import { FormButtons } from "@/components/form-buttons";
import { getProject } from "actions/projects";
import { Checkbox } from "@/components/ui/checkbox";
import ImageUploader from "@/components/image-uploader";
import { trpc } from "@/router";
import { useMutation } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { projectFormSchema } from "@/db/schema/projects";
import { useTrans } from "@/hooks/use-trans";

export const Route = createFileRoute("/dashboard/projects/$projectId")({
  loader: ({ params: { projectId } }) => {
    if (projectId === "new") return;
    return getProject({ data: { id: projectId } });
  },
  shouldReload: false,
  staleTime: Infinity,
  component: RouteComponent,
  pendingComponent: PageLoading,
});

type FormValues = z.infer<typeof projectFormSchema>;

function RouteComponent() {
  const {
    i18n: { language },
  } = useTranslation();
  const t = useTrans();
  const { projectId } = useParams({ from: "/dashboard/projects/$projectId" });
  const isNew = projectId === "new";
  const navigate = useNavigate();
  const data = useLoaderData({ from: "/dashboard/projects/$projectId" });
  const [isPending, setIsPending] = useState(false);
  const { mutateAsync: upsertProject } = useMutation(
    trpc.projects.upsert.mutationOptions(),
  );

  const form = useForm<FormValues>({
    resolver: zodResolver(projectFormSchema),
    defaultValues: data
      ? { ...data, live: data.live === "1" ? "1" : "0" }
      : { completion: 0, live: "1" },
  });

  useEffect(() => {
    if (language === "fr") form.setValue("lang", "fr");
    else form.setValue("lang", "en");
  }, [language, form]);

  const onSubmit = (values: FormValues) => {
    setIsPending(true);
    toast.promise(
      upsertProject({
        ...values,
        id: isNew ? undefined : projectId,
      }),
      {
        loading: "Submitting...",
        success: () => {
          navigate({ to: "/dashboard/projects", replace: true });
          return "Project updated!";
        },
        error: "Something went wrong!",
        finally: () => setIsPending(false),
      },
    );
  };

  return (
    <Gutter className="space-y-6">
      <PageTitle
        title={data ? "Edit Project" : "Create Project"}
        description={data ? "Edit the project" : "Create a new project"}
      />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 gap-4">
            <FormField
              control={form.control}
              name="cover"
              render={({ field }) => (
                <FormItem className="col-span-full">
                  <FormLabel>Image</FormLabel>
                  <FormControl>
                    <ImageUploader
                      value={field.value}
                      onChange={field.onChange}
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
                      placeholder={t("Project Title", "Titre du projet")}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="github"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>GitHub</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://github.com/user/repo"
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
              name="completion"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Completion</FormLabel>
                  <FormControl>
                    <NumericFormat
                      customInput={Input}
                      allowNegative={false}
                      suffix=" %"
                      value={field.value * 100}
                      onValueChange={({ floatValue }) => {
                        const value =
                          floatValue === undefined ? 0 : floatValue / 100;
                        field.onChange(value);
                      }}
                    />
                  </FormControl>
                  <FormDescription>A number between 0 and 100.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="live"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-nonw border p-4">
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
                      Is this project live for visitors to see?
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Write your project description here..."
                    {...field}
                    rows={10}
                  />
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
