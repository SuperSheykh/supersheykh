import { SkillCategoryInsert, skillCategorySchema } from "@/db/schema/skills";
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

const SkillCategoryForm = ({ id }: { id?: string }) => {
  const close = useDialog((state) => state.close);
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  const { data: category, isLoading } = useQuery(
    trpc.skillCategories.get.queryOptions(id, {
      refetchOnMount: true,
    }),
  );

  const form = useForm<z.infer<typeof skillCategorySchema>>({
    resolver: zodResolver(skillCategorySchema),
    defaultValues: {},
  });

  useEffect(() => {
    if (category) {
      form.reset(category);
    }
  }, [category]);

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
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Name" {...field} />
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
                  placeholder="Name (French)"
                  {...field}
                  value={field.value ?? undefined}
                />
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
