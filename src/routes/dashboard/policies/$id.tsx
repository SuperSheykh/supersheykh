import Gutter from "@/components/gutter";
import { createFileRoute } from "@tanstack/react-router";
import { getPolicyById } from "actions/policies";
import PageTitle from "@/components/page-title";
import { useMemo, useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import PolicyForm from "./-form";
import PolicyAiForm from "./-ai-form";

export const Route = createFileRoute("/dashboard/policies/$id")({
  loader: ({ params }) =>
    params.id === "new" ? null : getPolicyById({ data: { id: params.id } }),
  component: RouteComponent,
});

function RouteComponent() {
  const policy = Route.useLoaderData();
  const [showAiForm, setShowAiForm] = useState(true);
  const title = useMemo(() => (policy ? policy.title : "New Policy"), [policy]);
  const description = useMemo(
    () => (policy ? "Edit policy" : "Create a new policy"),
    [policy],
  );

  return (
    <Gutter>
      <PageTitle title={title} description={description} />
      <div className="flex items-center space-x-2 my-4">
        <Switch
          id="ai-form-toggle"
          checked={showAiForm}
          onCheckedChange={setShowAiForm}
        />
        <Label htmlFor="ai-form-toggle">Use AI Assistant</Label>
      </div>
      {showAiForm ? (
        <PolicyAiForm policy={policy} />
      ) : (
        <PolicyForm policy={policy} />
      )}
    </Gutter>
  );
}
