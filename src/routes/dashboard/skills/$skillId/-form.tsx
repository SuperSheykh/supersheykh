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
import { skillSchema, SkillInsert } from "@/db/schema/skills";
import { trpc } from "@/lib/utils/trpc";
import { Button } from "@/components/ui/button";
import { useNavigate } from "@tanstack/react-router";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SkillForm = ({
  skill,
}: {
  skill: TrpcRouterOutputs["skills"]["get"] | null;
}) => {
  const form = useForm<SkillInsert>({
    resolver: zodResolver(skillSchema),
    defaultValues: skill ?? {},
  });

  // const { data: categories } = trpc.skillCategories.getAll.useQuery();

  const utils = trpc.useUtils();
  const navigate = useNavigate();
  const upsertSkill = trpc.skills.upsert.useMutation({
    onSuccess: () => {
      utils.skills.getAll.invalidate();
      utils.skills.get.invalidate();
      navigate({ to: "/dashboard/skills" });
    },
  });

  const onSubmit: SubmitHandler<SkillInsert> = (data) => {
    upsertSkill.mutate(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
              <FormLabel>Name (FR)</FormLabel>
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
                  {/* {categories?.map((category) => ( */}
                  {/*   <SelectItem key={category.id} value={category.id}> */}
                  {/*     {category.name} */}
                  {/*   </SelectItem> */}
                  {/* ))} */}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={upsertSkill.isPending}>
          {upsertSkill.isPending ? "Saving..." : "Save"}
        </Button>
      </form>
    </Form>
  );
};

export default SkillForm;
