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
import { getBlog, upsertBlog } from "actions/blogs";
import ImageUploader from "@/components/image-uploader";

export const Route = createFileRoute("/dashboard/blogs/$blogId")({
  loader: ({ params: { blogId } }) => {
    if (blogId === "new") return;
    return getBlog({ data: { id: blogId } });
  },
  shouldReload: false,
  staleTime: Infinity,
  component: RouteComponent,
  pendingComponent: PageLoading,
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
  const { blogId } = useParams({ from: "/dashboard/blogs/$blogId" });
  const isNew = blogId === "new";
  const navigate = useNavigate();
  const data = useLoaderData({ from: "/dashboard/blogs/$blogId" });
  const [isPending, setIsPending] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: data ?? {},
  });

  const onSubmit = (values: FormValues) => {
    setIsPending(true);
    toast.promise(
      upsertBlog({ data: { ...values, id: isNew ? undefined : blogId } }),
      {
        loading: "Submitting...",
        success: () => {
          navigate({ to: "/dashboard/blogs" });
          return "Blog post updated!";
        },
        error: "Something went wrong!",
        finally: () => setIsPending(false),
      },
    );
  };

  return (
    <Gutter className="space-y-8">
      <PageTitle
        title={data ? "Edit Blog" : "Create Blog"}
        description={data ? "Edit the blog post" : "Create a new blog post"}
      />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="cover"
            render={({ field }) => (
              <FormItem className="col-span-full">
                <FormLabel>Cover Image</FormLabel>
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
