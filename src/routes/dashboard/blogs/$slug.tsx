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
import {
  MDXEditor,
  headingsPlugin,
  listsPlugin,
  linkPlugin,
  quotePlugin,
  imagePlugin,
  tablePlugin,
  thematicBreakPlugin,
  frontmatterPlugin,
  markdownShortcutPlugin,
} from "@mdxeditor/editor";
import "@mdxeditor/editor/style.css";

import { blogFormSchema } from "@/db/schema/blogs";

import PageLoading from "@/components/page-loading";
import PageTitle from "@/components/page-title";
import Gutter from "@/components/gutter";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FormButtons } from "@/components/form-buttons";
import { getBlogBySlug, upsertBlog } from "actions/blogs";
import ImageUploader from "@/components/image-uploader";
import { useTranslation } from "react-i18next";
import { useTrans } from "@/hooks/use-trans";

export const Route = createFileRoute("/dashboard/blogs/$slug")({
  loader: ({ params: { slug } }) => {
    if (slug === "new") return null;
    return getBlogBySlug({ data: { slug: slug } });
  },
  component: RouteComponent,
  pendingComponent: PageLoading,
});

type FormValues = z.infer<typeof blogFormSchema>;

function RouteComponent() {
  const {
    i18n: { language },
  } = useTranslation();
  const t = useTrans();
  const { slug } = useParams({ from: "/dashboard/blogs/$slug" });
  const isNew = slug === "new";
  const navigate = useNavigate();
  const data = useLoaderData({ from: "/dashboard/blogs/$slug" });
  const [isPending, setIsPending] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(blogFormSchema),
    defaultValues: data ?? {},
  });

  useEffect(() => {
    if (language === "fr") form.setValue("lang", "fr");
    else form.setValue("lang", "en");
  }, [language, form]);

  const onSubmit = (values: FormValues) => {
    setIsPending(true);
    toast.promise(upsertBlog({ data: values }), {
      loading: "Submitting...",
      success: () => {
        navigate({ to: "..", replace: true });
        return "Blog post updated!";
      },
      error: "Something went wrong!",
      finally: () => setIsPending(false),
    });
  };

  return (
    <Gutter className="space-y-8">
      <PageTitle
        title={t(
          data ? "Edit Blog" : "Create Blog",
          data ? "Modifier le blog" : "Créer un blog",
        )}
        description={t(
          data ? "Edit the blog post" : "Create a new blog post",
          data
            ? "Modifier l'article de blog"
            : "Créer un nouvel article de blog",
        )}
      />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="cover"
            render={({ field }) => (
              <FormItem className="col-span-full">
                <FormLabel>{t("Cover Image", "Image de couverture")}</FormLabel>
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
                    placeholder={t("Blog Title", "Titre du Blog")}
                    {...field}
                  />
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
                <FormLabel>{t("Content", "Contenu")}</FormLabel>
                <FormControl>
                  {/* <MDXEditor */}
                  {/*   markdown={field.value} */}
                  {/*   onChange={field.onChange} */}
                  {/*   ref={field.ref} */}
                  {/*   plugins={[ */}
                  {/*     headingsPlugin(), */}
                  {/*     listsPlugin(), */}
                  {/*     linkPlugin(), */}
                  {/*     quotePlugin(), */}
                  {/*     imagePlugin(), */}
                  {/*     tablePlugin(), */}
                  {/*     thematicBreakPlugin(), */}
                  {/*     frontmatterPlugin(), */}
                  {/*     markdownShortcutPlugin(), */}
                  {/*   ]} */}
                  {/* /> */}
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
