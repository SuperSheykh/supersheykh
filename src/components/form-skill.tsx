import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { z } from "zod";

import { skillSchema } from "@/db/schema/skills";

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

const formSchema = skillSchema.pick({
  name: true,
  name_fr: true,
  category_id: true,
});

type FormValues = z.infer<typeof formSchema>;

function SkillForm({ id, onSuccess }: { id?: string; onSuccess?: () => void }) {
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
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", name_fr: "", category_id: null },
  });

  useEffect(() => {
    if (data) {
      form.reset(data);
    }
  }, [data, form]);

  //Lets make sure the form cattegory select is updated after all categories are loaded.
  useEffect(() => {}, []);

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
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Skill Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name_fr"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name (French)</FormLabel>
              <FormControl>
                <Input
                  placeholder="Nom de la compétence"
                  {...field}
                  value={field.value ?? ""}
                />
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
                <FormLabel>Category</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  value={field.value ?? undefined}
                >
                  <FormControl>
                    <SelectTrigger className="w-full rounded-none">
                      <SelectValue placeholder="Select a category" />
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
