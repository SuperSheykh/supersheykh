import { TrpcRouterOutputs } from "@/types";
import {
  Form,
  FormItem,
  FormField,
  FormControl,
  FormMessage,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { blogSchema, BlogInsert } from "@/db/schema/blogs";
import { trpc } from "@/lib/utils/trpc";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate, useParams } from "@tanstack/react-router";

const BlogForm = ({
  blog,
}: {
  blog: TrpcRouterOutputs["blogs"]["get"] | null;
}) => {
  const form = useForm<BlogInsert>({
    resolver: zodResolver(blogSchema),
    defaultValues: blog ?? {},
  });

  const utils = trpc.useUtils();
  const navigate = useNavigate();
  const upsertBlog = trpc.blogs.upsert.useMutation({
    onSuccess: () => {
      utils.blogs.getAll.invalidate();
      utils.blogs.get.invalidate();
      navigate({ to: "/dashboard/blogs" });
    },
  });

  const onSubmit: SubmitHandler<BlogInsert> = (data) => {
    upsertBlog.mutate(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
              <FormLabel>Title (FR)</FormLabel>
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
                <Input placeholder="blog-slug" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content</FormLabel>
              <FormControl>
                <Textarea placeholder="Blog Content" {...field} />
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
              <FormLabel>Content (FR)</FormLabel>
              <FormControl>
                <Textarea placeholder="Contenu du Blog" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="cover"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cover Image URL</FormLabel>
              <FormControl>
                <Input placeholder="https://example.com/cover.jpg" {...field} value={field.value ?? ''} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={upsertBlog.isPending}>
          {upsertBlog.isPending ? "Saving..." : "Save"}
        </Button>
      </form>
    </Form>
  );
};

export default BlogForm;
