import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import { FormButtons } from "@/components/form-buttons";
import { toast } from "sonner";
import { upsertPolicy } from "actions/policies";
import { Policy, policySchema } from "@/db/schema/policies";
import { useRouter } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { zodResolver } from "@hookform/resolvers/zod";
import slugify from "@/lib/utils/slugify";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const PolicyForm = ({ policy }: { policy: Policy | null }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const {
    i18n: { language },
  } = useTranslation();

  const form = useForm<z.infer<typeof policySchema>>({
    resolver: zodResolver(policySchema),
    defaultValues: policy ?? {},
  });

  const title = form.watch("title");
  const titleFr = form.watch("titleFr");

  useEffect(() => {
    const titleToSlugify = title || titleFr;
    if (titleToSlugify) {
      form.setValue("slug", slugify(titleToSlugify));
    }
  }, [title, titleFr, form]);

  const onSubmit: SubmitHandler<z.infer<typeof policySchema>> = (data) => {
    setLoading(true);
    toast.promise(upsertPolicy({ data }), {
      loading: "Submitting...",
      success: () => {
        router.navigate({ to: "/dashboard/policies", replace: true });
        return "Submitted!";
      },
      error: "Error saving policy",
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
          <TabsList>
            <TabsTrigger value="en">English</TabsTrigger>
            <TabsTrigger value="fr">French</TabsTrigger>
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
                      <Textarea {...field} placeholder="Content" />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </TabsContent>
          <TabsContent value="fr">
            <div className="flex flex-col gap-4 pt-4">
              <FormField
                name="titleFr"
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
                name="contentFr"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>French Content</FormLabel>
                    <FormControl>
                      <Textarea {...field} placeholder="French Content" />
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

export default PolicyForm;

