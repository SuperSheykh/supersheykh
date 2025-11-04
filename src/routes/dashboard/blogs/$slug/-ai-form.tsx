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
import { upsertAiBlog } from "actions/blogs";
import { Blog, blogAiFormSchema } from "@/db/schema/blogs";
import { useRouter } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { zodResolver } from "@hookform/resolvers/zod";
import ImageUploader from "@/components/image-uploader";
import { Textarea } from "@/components/ui/textarea";

const BlogAiForm = ({ blog }: { blog: Blog | null }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { i18n } = useTranslation();

  const form = useForm<z.infer<typeof blogAiFormSchema>>({
    resolver: zodResolver(blogAiFormSchema),
    defaultValues: blog
      ? {
          id: blog.id,
          cover: blog.cover,
          title: i18n.language === "fr" ? blog.title_fr : blog.title,
          prompt: "",
        }
      : {},
  });

  useEffect(() => {
    if (i18n.language === "fr") {
      form.setValue("lang", "fr");
    } else form.setValue("lang", "en");
  }, [i18n.language, form]);

  const onSubmit: SubmitHandler<z.infer<typeof blogAiFormSchema>> = (data) => {
    setLoading(true);
    toast.promise(upsertAiBlog({ data }), {
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
          name="prompt"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Prompt</FormLabel>
              <FormControl>
                <Textarea {...field} placeholder="Title" className="h-32" />
              </FormControl>
            </FormItem>
          )}
        />
        <FormButtons isPending={loading} />
      </form>
    </Form>
  );
};

export default BlogAiForm;
