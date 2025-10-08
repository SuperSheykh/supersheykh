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
import { quoteSchema, QuoteInsert } from "@/db/schema/quotes";
import { trpc } from "@/router";
import { Button } from "@/components/ui/button";
import { useNavigate } from "@tanstack/react-router";
import { Checkbox } from "@/components/ui/checkbox";

const QuoteForm = ({
  quote,
}: {
  quote: TrpcRouterOutputs["quotes"]["get"] | null;
}) => {
  const form = useForm<QuoteInsert>({
    resolver: zodResolver(quoteSchema),
    defaultValues: quote ?? {},
  });

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<QuoteInsert> = (data) => {};

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="author"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Author</FormLabel>
              <FormControl>
                <Input placeholder="Quote Author" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="live"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
              <FormControl>
                <Checkbox
                  checked={field.value === "1"}
                  onCheckedChange={(checked) =>
                    field.onChange(checked ? "1" : "0")
                  }
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Live</FormLabel>
              </div>
            </FormItem>
          )}
        />
        <Button type="submit" disabled={false}>
          Save
        </Button>
      </form>
    </Form>
  );
};

export default QuoteForm;
