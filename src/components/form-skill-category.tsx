import { SkillCategoryInsert, skillCategoryFormSchema } from "@/db/schema/skills";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { FormButtons } from "./form-buttons";
import { useMutation, useQuery } from "@tanstack/react-query";
import { trpc } from "@/router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useDialog } from "@/hooks/use-dialog";
import PageLoading from "./page-loading";
import { useRouter } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { useTrans } from "@/hooks/use-trans";

const SkillCategoryForm = ({ id }: { id?: string }) => {
  const {
    i18n: { language },
  } = useTranslation();
  const t = useTrans();
  const close = useDialog((state) => state.close);
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  const { data: category, isLoading } = useQuery(
    trpc.skillCategories.get.queryOptions(id, {
      refetchOnMount: true,
    }),
  );

  const form = useForm<z.infer<typeof skillCategoryFormSchema>>({
    resolver: zodResolver(skillCategoryFormSchema),
    defaultValues: {},
  });

  useEffect(() => {
    if (category) {
      form.reset(category);
    }
  }, [category]);

  useEffect(() => {
    if (language === "fr") form.setValue("lang", "fr");
    else form.setValue("lang", "en");
  }, [language, form]);

  const { mutateAsync: upsertSkillCategory } = useMutation(
    trpc.skillCategories.upsert.mutationOptions(),
  );

  const onSubmit: SubmitHandler<SkillCategoryInsert> = (values) => {
    setIsPending(true);
    toast.promise(upsertSkillCategory(values), {
      loading: "Submitting...",
      success: () => {
        close();
        router.invalidate();
        return id ? "Updated!" : "Created!";
      },
      error: "Something went wrong!",
      finally: () => setIsPending(false),
    });
  };

  if (isLoading) return <PageLoading />;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("Name", "Nom")}</FormLabel>
              <FormControl>
                <Input placeholder={t("Name", "Nom")} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormButtons isPending={isPending} inDialog />
      </form>
    </Form>
  );
};

export default SkillCategoryForm;
