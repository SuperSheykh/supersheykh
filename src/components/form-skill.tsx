import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { z } from "zod";

import { skillFormSchema } from "@/db/schema/skills";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormButtons } from "@/components/form-buttons";
import { upsertSkill } from "actions/skills";
import { useEffect, useState } from "react";
import { trpc } from "@/router";
import { useQuery } from "@tanstack/react-query";
import { useDialog } from "@/hooks/use-dialog";
import PageLoading from "./page-loading";
import { useRouter } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { useTrans } from "@/hooks/use-trans";

type FormValues = z.infer<typeof skillFormSchema>;

function SkillForm({ id, onSuccess }: { id?: string; onSuccess?: () => void }) {
  const {
    i18n: { language },
  } = useTranslation();
  const t = useTrans();
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);
  const { close } = useDialog();
  const isNew = !id;

  const {
    data: allCategories,
    isLoading: isLoadingCategories,
    isSuccess,
  } = useQuery(
    trpc.skillCategories.getAll.queryOptions(undefined, {
      refetchOnMount: true,
    }),
  );

  const { data, isLoading } = useQuery(
    trpc.skills.get.queryOptions(id, {
      enabled: !isNew && isSuccess,
      refetchOnMount: true,
    }),
  );

  const form = useForm<FormValues>({
    resolver: zodResolver(skillFormSchema),
    defaultValues: { name: "", category_id: null },
  });

  useEffect(() => {
    if (data) {
      form.reset(data);
    }
  }, [data, form]);

  useEffect(() => {
    if (language === "fr") form.setValue("lang", "fr");
    else form.setValue("lang", "en");
  }, [language, form]);

  const onSubmit = (values: FormValues) => {
    setIsPending(true);
    toast.promise(
      upsertSkill({ data: { ...values, id: isNew ? undefined : id } }),
      {
        loading: "Submitting...",
        success: () => {
          if (onSuccess) {
            onSuccess();
          }
          router.invalidate();
          close();
          return "Skill updated!";
        },
        error: "Something went wrong!",
        finally: () => setIsPending(false),
      },
    );
  };

  if (isLoading || isLoadingCategories) return <PageLoading />;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-1 gap-4"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("Name", "Nom")}</FormLabel>
              <FormControl>
                <Input placeholder={t("Skill Name", "Nom de la compétence")} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {allCategories && allCategories?.length > 0 && (
          <FormField
            control={form.control}
            name="category_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("Category", "Catégorie")}</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  value={field.value ?? undefined}
                >
                  <FormControl>
                    <SelectTrigger className="w-full rounded-none">
                      <SelectValue placeholder={t("Select a category", "Sélectionnez une catégorie")} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {allCategories?.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        <FormButtons isPending={isPending} inDialog />
      </form>
    </Form>
  );
}

export default SkillForm;
