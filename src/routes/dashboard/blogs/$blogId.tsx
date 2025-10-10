import {
  createFileRoute,
  useNavigate,
  useParams,
} from "@tanstack/react-router";
import { trpc } from "@/router";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useEffect } from "react";
import { toast } from "sonner";

import { blogSchema } from "@/db/schema/blogs";

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
import { FormButtons } from "@/components/form-buttons";
import { useMutation, useQuery } from "@tanstack/react-query";

export const Route = createFileRoute("/dashboard/blogs/$blogId")({
  component: RouteComponent,
});

const formSchema = blogSchema.pick({
  title: true,
  title_fr: true,
  slug: true,
  content: true,
  content_fr: true,
  cover: true,
});

type FormValues = z.infer<typeof formSchema>;

function RouteComponent() {
  const { blogId } = useParams({
    from: "/dashboard/blogs/$blogId",
  });
  const isNew = blogId === "new";
  const navigate = useNavigate();

  const { data, isLoading } = useQuery(
    trpc.blogs.get.queryOptions(blogId, {
      enabled: !isNew,
    }),
  );

  const { mutateAsync, isPending } = useMutation(
    trpc.blogs.upsert.mutationOptions(),
  );

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });

  useEffect(() => {
    if (data) {
      form.reset(data);
    }
  }, [data, form]);

  const onSubmit = (values: FormValues) => {
    toast.promise(mutateAsync({ ...values, id: isNew ? undefined : blogId }), {
      loading: "Submitting...",
      success: () => {
        navigate({ to: "/dashboard/blogs" });
        return "Blog post updated!";
      },
      error: "Something went wrong!",
    });
  };

  if (isLoading && !isNew) return <PageLoading />;

  return (
    <Gutter className="space-y-8">
      <PageTitle
        title={data ? "Edit Blog" : "Create Blog"}
        description={data ? "Edit the blog post" : "Create a new blog post"}
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
                    <Input placeholder="Blog Title" {...field} />
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
                    <Input placeholder="Titre du Blog" {...field} />
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
                    <Input placeholder="blog-title" {...field} />
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
              name="cover"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cover Image</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Image ID"
                      {...field}
                      value={field.value ?? ""}
                    />
                  </FormControl>
                  <FormDescription>
                    The ID of the image from the images table.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Content</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Write your blog post here..."
                    {...field}
                    rows={15}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="content_fr"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Content (French)</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Écrivez votre article de blog ici..."
                    {...field}
                    rows={15}
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
