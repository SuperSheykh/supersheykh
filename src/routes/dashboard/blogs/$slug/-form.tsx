import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { FormButtons } from "@/components/form-buttons";
import { toast } from "sonner";
import { upsertBlog } from "actions/blogs";
import { Blog, blogFormSchema } from "@/db/schema/blogs";
import { useRouter } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { zodResolver } from "@hookform/resolvers/zod";
import slugify from "@/lib/utils/slugify";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MDTextArea from "@/components/ui/md-text-area";
import ImageUploader from "@/components/image-uploader";

const BlogForm = ({ blog }: { blog: Blog | null }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const {
    i18n: { language },
  } = useTranslation();

  const form = useForm<z.infer<typeof blogFormSchema>>({
    resolver: zodResolver(blogFormSchema),
    defaultValues: blog ?? {},
  });

  const title = form.watch("title");
  const titleFr = form.watch("title_fr");

  useEffect(() => {
    const titleToSlugify = title || titleFr;
    if (titleToSlugify) {
      form.setValue("slug", slugify(titleToSlugify));
    }
  }, [title, titleFr, form]);

  const onSubmit: SubmitHandler<z.infer<typeof blogFormSchema>> = (data) => {
    setLoading(true);
    toast.promise(upsertBlog({ data }), {
      loading: "Submitting...",
      success: () => {
        router.navigate({ to: "/dashboard/blogs", replace: true });
        return "Submitted!";
      },
      error: "Error saving blog",
      finally: () => setLoading(false),
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <FormField
          control={form.control}
          name="cover"
          render={({ field }) => (
            <FormItem className="col-span-full">
              <FormLabel>Cover Image</FormLabel>
              <FormControl>
                <ImageUploader
                  value={field.value as string | null}
                  onChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="slug"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Slug</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Slug" />
              </FormControl>
            </FormItem>
          )}
        />
        <Tabs defaultValue={language}>
          <TabsList className="w-full rounded-none">
            <TabsTrigger value="en" className="w-full rounded-none">
              English
            </TabsTrigger>
            <TabsTrigger value="fr" className="w-full rounded-none">
              French
            </TabsTrigger>
          </TabsList>
          <TabsContent value="en">
            <div className="flex flex-col gap-4 pt-4">
              <FormField
                name="title"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Title" />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                name="content"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Content</FormLabel>
                    <FormControl>
                      <MDTextArea {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </TabsContent>
          <TabsContent value="fr">
            <div className="flex flex-col gap-4 pt-4">
              <FormField
                name="title_fr"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>French Title</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="French Title" />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                name="content_fr"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>French Content</FormLabel>
                    <FormControl>
                      <MDTextArea {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </TabsContent>
        </Tabs>
        <FormButtons isPending={loading} />
      </form>
    </Form>
  );
};

export default BlogForm;
