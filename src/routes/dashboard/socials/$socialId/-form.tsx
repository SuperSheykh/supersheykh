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
import { socialSchema, SocialInsert } from "@/db/schema/socials";
import { trpc } from "@/lib/utils/trpc";
import { Button } from "@/components/ui/button";
import { useNavigate } from "@tanstack/react-router";

const SocialForm = ({
  social,
}: {
  social: TrpcRouterOutputs["socials"]["get"] | null;
}) => {
  const form = useForm<SocialInsert>({
    resolver: zodResolver(socialSchema),
    defaultValues: social ?? {},
  });

  const utils = trpc.useUtils();
  const navigate = useNavigate();
  const upsertSocial = trpc.socials.upsert.useMutation({
    onSuccess: () => {
      utils.socials.getAll.invalidate();
      utils.socials.get.invalidate();
      navigate({ to: "/dashboard/socials" });
    },
  });

  const onSubmit: SubmitHandler<SocialInsert> = (data) => {
    upsertSocial.mutate(data);
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
                <Input placeholder="Social Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>URL</FormLabel>
              <FormControl>
                <Input placeholder="https://example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={upsertSocial.isPending}>
          {upsertSocial.isPending ? "Saving..." : "Save"}
        </Button>
      </form>
    </Form>
  );
};

export default SocialForm;
