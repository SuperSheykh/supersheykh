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
import { upsertPolicyAi } from "actions/policies";
import { Policy, policyFormSchema } from "@/db/schema/policies";
import { useRouter } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { zodResolver } from "@hookform/resolvers/zod";

const PolicyAiForm = ({ policy }: { policy: Policy | null }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { i18n } = useTranslation();

  const form = useForm<z.infer<typeof policyFormSchema>>({
    resolver: zodResolver(policyFormSchema),
    defaultValues: policy ?? {},
  });

  useEffect(() => {
    if (i18n.language === "fr") {
      form.setValue("lang", "fr");
    } else form.setValue("lang", "en");
  }, [i18n.language, form]);

  const onSubmit: SubmitHandler<z.infer<typeof policyFormSchema>> = (data) => {
    setLoading(true);
    toast.promise(upsertPolicyAi({ data }), {
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
                <Textarea {...field} placeholder="Prompt (intructions)" />
              </FormControl>
            </FormItem>
          )}
        />
        <FormButtons isPending={loading} />
      </form>
    </Form>
  );
};

export default PolicyAiForm;
