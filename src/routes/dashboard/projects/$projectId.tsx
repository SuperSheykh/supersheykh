import { createFileRoute, useNavigate, useParams } from "@tanstack/react-router";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { z } from "zod";

import { trpc } from "@/lib/utils/trpc";
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
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { FormButtons } from "@/components/form-buttons";

export const Route = createFileRoute("/dashboard/projects/$projectId")({
  component: RouteComponent,
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
  const { projectId } = useParams({ from: "/dashboard/projects/$projectId/" });
  const isNew = projectId === "new";
  const navigate = useNavigate();

  const { data, isLoading } = useQuery(
    trpc.projects.get.queryOptions(projectId, { enabled: !isNew })
  );

  const { mutateAsync, isPending } = useMutation(
    trpc.projects.upsert.mutationOptions()
  );

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: data ?? { live: "0", completion: 0 },
  });

  useEffect(() => {
    if (data) {
      form.reset(data);
    }
  }, [data, form]);

  const onSubmit = (values: FormValues) => {
    toast.promise(mutateAsync({ ...values, id: isNew ? undefined : projectId }), {
      loading: "Submitting...",
      success: () => {
        navigate({ to: "/dashboard/projects" });
        return "Project updated!";
      },
      error: "Something went wrong!",
    });
  };

  if (isLoading && !isNew) return <PageLoading />;

  return (
    <Gutter className="space-y-8">
      <PageTitle
        title={data ? "Edit Project" : "Create Project"}
        description={data ? "Edit the project details" : "Create a new project"}
      />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
          </div>
          <FormField
            control={form.control}
            name="slug"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Slug</FormLabel>
                <FormControl>
                  <Input placeholder="project-title" {...field} />
                </FormControl>
                <FormDescription>This will be used in the URL.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="Project description" {...field} />
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
                  <Textarea placeholder="Description du projet" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FormField
              control={form.control}
              name="cover"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cover Image</FormLabel>
                  <FormControl>
                    <Input placeholder="Image ID" {...field} />
                  </FormControl>
                  <FormDescription>
                    The ID of the image from the images table.
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
                  <FormLabel>GitHub URL</FormLabel>
                  <FormControl>
                    <Input placeholder="https://github.com/user/repo" {...field} value={field.value ?? ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FormField
              control={form.control}
              name="completion"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Completion (0-1)</FormLabel>
                  <FormControl>
                    <Input type="number" min={0} max={1} step={0.01} {...field} onChange={e => field.onChange(parseFloat(e.target.value))} />
                  </FormControl>
                  <FormDescription>
                    A number between 0 and 1 representing the project completion.
                  </FormDescription>
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
                      Is this project currently live?
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