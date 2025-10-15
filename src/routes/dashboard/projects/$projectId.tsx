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

import { projectSchema } from "@/db/schema/projects";

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

const formSchema = projectSchema.pick({
  title: true,
  title_fr: true,
  description: true,
  description_fr: true,
  slug: true,
  cover: true,
  live: true,
  completion: true,
  github: true,
});

type FormValues = z.infer<typeof formSchema>;

function RouteComponent() {
  const { projectId } = useParams({ from: "/dashboard/projects/$projectId" });
  const isNew = projectId === "new";
  const navigate = useNavigate();
  const data = useLoaderData({ from: "/dashboard/projects/$projectId" });
  const [isPending, setIsPending] = useState(false);
  const { mutateAsync: upsertProject } = useMutation(
    trpc.projects.upsert.mutationOptions(),
  );

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: data
      ? { ...data, live: data.live === "1" ? "1" : "0" }
      : { completion: 0, live: "1" },
  });

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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Project Title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="title_fr"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title (French)</FormLabel>
                  <FormControl>
                    <Input placeholder="Titre du Projet" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="slug"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Slug</FormLabel>
                  <FormControl>
                    <Input placeholder="project-title" {...field} />
                  </FormControl>
                  <FormDescription>
                    This will be used in the URL.
                  </FormDescription>
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
          <FormField
            control={form.control}
            name="description_fr"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description (French)</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Écrivez votre description de projet ici..."
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
