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
import { billboardSchema, BillboardInsert } from "@/db/schema/billboards";
import { trpc } from "@/lib/utils/trpc";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";

const BillboardForm = ({
  billboard,
}: {
  billboard: TrpcRouterOutputs["billboards"]["get"] | null;
}) => {
  const form = useForm<BillboardInsert>({
    resolver: zodResolver(billboardSchema),
    defaultValues: billboard ?? {},
  });

  const utils = trpc.useUtils();
  const navigate = useNavigate();
  const upsertBillboard = trpc.billboards.upsert.useMutation({
    onSuccess: () => {
      utils.billboards.getAll.invalidate();
      utils.billboards.get.invalidate();
      navigate({ to: "/dashboard/billboards" });
    },
  });

  const onSubmit: SubmitHandler<BillboardInsert> = (data) => {
    toast.promise(upsertBillboard.mutateAsync(data), {
      loading: "Saving...",
      success: "Saved!",
      error: "Something went wrong!",
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="greeting"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Greeting</FormLabel>
              <FormControl>
                <Input placeholder="Hi there" {...field} value={field.value ?? ''} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="greeting_fr"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Greeting (FR)</FormLabel>
              <FormControl>
                <Input placeholder="Salut" {...field} value={field.value ?? ''} />
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
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Welcome to my page" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="title_fr"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title (FR)</FormLabel>
              <FormControl>
                <Input placeholder="Bienvenue sur ma page" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Billboard Description" {...field} value={field.value ?? ''} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description_fr"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description (FR)</FormLabel>
              <FormControl>
                <Textarea placeholder="Description du billboard" {...field} value={field.value ?? ''} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />\n        <FormField
          control={form.control}
          name="buttonText"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Button Text</FormLabel>
              <FormControl>
                <Input placeholder="Click me" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="buttonText_fr"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Button Text (FR)</FormLabel>
              <FormControl>
                <Input placeholder="Cliquez ici" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="buttonLink"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Button Link</FormLabel>
              <FormControl>
                <Input placeholder="/contact" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="imageUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image URL</FormLabel>
              <FormControl>
                <Input placeholder="/hero.png" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="imageAlt"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image Alt</FormLabel>
              <FormControl>
                <Input placeholder="A picture of me" {...field} value={field.value ?? ''} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="subText"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sub-text</FormLabel>
              <FormControl>
                <Input placeholder="I am a developer" {...field} value={field.value ?? ''} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="subText_fr"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sub-text (FR)</FormLabel>
              <FormControl>
                <Input placeholder="Je suis un developpeur" {...field} value={field.value ?? ''} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="subLink"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sub-link</FormLabel>
              <FormControl>
                <Input placeholder="/about" {...field} value={field.value ?? ''} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="subLinkText"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sub-link Text</FormLabel>
              <FormControl>
                <Input placeholder="About me" {...field} value={field.value ?? ''} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="subLinkText_fr"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sub-link Text (FR)</FormLabel>
              <FormControl>
                <Input placeholder="A propos de moi" {...field} value={field.value ?? ''} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-x-2 justify-end">
          <Button type="button">Cancel</Button>
          <Button type="submit" disabled={upsertBillboard.isPending}>
            {upsertBillboard.isPending ? <Spinner /> : "Save"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default BillboardForm;
