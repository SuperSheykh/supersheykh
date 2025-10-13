import {
  createFileRoute,
  useLoaderData,
  useNavigate,
  useParams,
} from "@tanstack/react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import PageTitle from "@/components/page-title";
import Gutter from "@/components/gutter";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FormButtons } from "@/components/form-buttons";
import { useState } from "react";
import { toast } from "sonner";
import { getBillboard, upsertBillboard } from "actions/billboards";
import PageLoading from "@/components/page-loading";
import { billboardSchema } from "@/db/schema/billboards";
import ImageUploader from "@/components/image-uploader";

export const Route = createFileRoute("/dashboard/billboards/$billboardId")({
  loader: ({ params: { billboardId } }) =>
    getBillboard({ data: { id: billboardId } }),
  shouldReload: false,
  staleTime: Infinity,
  component: RouteComponent,
  pendingComponent: PageLoading,
});

type FormValues = z.infer<typeof billboardSchema>;

function RouteComponent() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const data =
    useLoaderData({ from: "/dashboard/billboards/$billboardId" }) ?? {};

  const form = useForm<FormValues>({
    resolver: zodResolver(billboardSchema),
    defaultValues: data,
  });

  const imageUrl = form.watch("imageUrl");
  console.log("imageUrl:", imageUrl);

  const onSubmit = (values: FormValues) => {
    setLoading(true);
    toast.promise(upsertBillboard({ data: values }), {
      loading: "Submitting...",
      success: () => {
        navigate({ to: ".." });
        return "Billboard updated!";
      },
      error: "Something went wrong!",
      finally: () => setLoading(false),
    });
  };

  return (
    <Gutter className="space-y-8">
      <PageTitle
        title={data ? "Edit" : "Create"}
        description={data ? "Edit the billboard" : "Create a new billboard"}
      />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FormField
              control={form.control}
              name="greeting"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Greeting</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Hello there"
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
              name="greeting_fr"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Greeting (French)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Bonjour"
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
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Welcome to my portfolio" {...field} />
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
                  <FormLabel>Title (French)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Bienvenue sur mon portfolio"
                      {...field}
                    />
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
                    <Input
                      placeholder="Short description"
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
              name="description_fr"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description (French)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Description courte"
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
                  <FormLabel>Button Text (French)</FormLabel>
                  <FormControl>
                    <Input placeholder="Cliquez-moi" {...field} />
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
              name="imageAlt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image Alt</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Alt text for image"
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
              name="subText"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sub Text</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Some subtext"
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
              name="subText_fr"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sub Text (French)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Un peu de sous-texte"
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
              name="subLink"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sub Link</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="/about"
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
              name="subLinkText"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sub Link Text</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Read more"
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
              name="subLinkText_fr"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sub Link Text (French)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Lire la suite"
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
              name="imageUrl"
              render={({ field }) => (
                <FormItem className="col-span-full">
                  <FormLabel>Image URL</FormLabel>
                  <FormControl>
                    <ImageUploader onUpload={field.onChange} />
                  </FormControl>
                  <FormDescription>
                    Better choose a square image with a transparent background.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormButtons isPending={loading} />
        </form>
      </Form>
    </Gutter>
  );
}
