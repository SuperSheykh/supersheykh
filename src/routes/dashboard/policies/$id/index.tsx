import { useMemo } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { getPolicyById } from "actions/policies";
import PageTitle from "@/components/page-title";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import PolicyForm from "./-form";
import PolicyAiForm from "./-ai-form";
import Gutter from "@/components/gutter";
import z from "zod";

const formSearchSchema = z.object({
  type: z.enum(["ai", "edit"]).optional().default("ai"),
});

export const Route = createFileRoute("/dashboard/policies/$id/")({
  validateSearch: (search) => formSearchSchema.parse(search),
  loader: ({ params }) => getPolicyById({ data: { id: params.id } }),
  component: RouteComponent,
});

function RouteComponent() {
  const policy = Route.useLoaderData();
  const navigate = useNavigate();
  const { type } = Route.useSearch();
  const title = useMemo(() => (policy ? policy.title : "New Policy"), [policy]);
  const description = useMemo(
    () => (policy ? "Edit policy" : "Create a new policy"),
    [policy],
  );

  const switchToAi = (checked: boolean) => {
    navigate({
      from: "/dashboard/policies/$id",
      search: { type: checked ? "ai" : "edit" },
    });
  };

  return (
    <Gutter>
      <PageTitle title={title} description={description} />
      <div className="flex items-center space-x-2 mb-8 ">
        <Switch
          id="ai-form-toggle"
          checked={type === "ai"}
          onCheckedChange={switchToAi}
        />
        <Label htmlFor="ai-form-toggle">Use AI Assistant</Label>
      </div>

      {type === "ai" ? (
        <PolicyAiForm policy={policy} />
      ) : (
        <PolicyForm policy={policy} />
      )}
    </Gutter>
  );
}
