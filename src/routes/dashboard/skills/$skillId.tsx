import { createFileRoute, useNavigate, useParams } from "@tanstack/react-router";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { z } from "zod";

import { trpc } from "@/router";
import { skillSchema } from "@/db/schema/skills";

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormButtons } from "@/components/form-buttons";

export const Route = createFileRoute("/dashboard/skills/$skillId")({
  component: RouteComponent,
});

const formSchema = skillSchema.pick({
  name: true,
  name_fr: true,
  category_id: true,
});

type FormValues = z.infer<typeof formSchema>;

function RouteComponent() {
  const { skillId } = useParams({ from: "/dashboard/skills/$skillId" });
  const isNew = skillId === "new";
  const navigate = useNavigate();

  const { data, isLoading } = useQuery(
    trpc.skills.get.queryOptions(skillId, { enabled: !isNew })
  );

  const { data: categories, isLoading: isLoadingCategories } = useQuery(
    trpc.skillCategories.getAll.queryOptions()
  );

  const { mutateAsync, isPending } = useMutation(
    trpc.skills.upsert.mutationOptions()
  );

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: data ?? {},
  });

  useEffect(() => {
    if (data) {
      form.reset(data);
    }
  }, [data, form]);

  const onSubmit = (values: FormValues) => {
    toast.promise(mutateAsync({ ...values, id: isNew ? undefined : skillId }), {
      loading: "Submitting...",
      success: () => {
        navigate({ to: "/dashboard/skills" });
        return "Skill updated!";
      },
      error: "Something went wrong!",
    });
  };

  if ((isLoading && !isNew) || isLoadingCategories) return <PageLoading />;

  return (
    <Gutter className="space-y-8">
      <PageTitle
        title={data ? "Edit Skill" : "Create Skill"}
        description={data ? "Edit the skill" : "Create a new skill"}
      />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
          </div>
          <FormField
            control={form.control}
            name="category_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value ?? undefined}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {categories?.map((category) => (
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
          <FormButtons isPending={isPending} />
        </form>
      </Form>
    </Gutter>
  );
}
