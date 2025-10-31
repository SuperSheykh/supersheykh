import Gutter from "@/components/gutter";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { getPolicyById } from "actions/policies";
import MDEditor from "@uiw/react-md-editor";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";

export const Route = createFileRoute("/dashboard/policies/$id/view")({
  loader: ({ params }) => getPolicyById({ data: { id: params.id } }),
  component: RouteComponent,
});

function RouteComponent() {
  const policy = Route.useLoaderData();
  const navigate = useNavigate();
  return (
    <Gutter className="py-8">
      {/* <PageTitle title={policy.title} /> */}
      <div className="mb-6">
        <Button
          variant="secondary"
          onClick={() =>
            navigate({
              to: "/dashboard/policies/$id",
              params: { id: policy.id },
              search: { type: "edit" },
            })
          }
        >
          <Edit className="mr-2" />
          Edit
        </Button>
      </div>
      <MDEditor.Markdown
        source={policy.content}
        style={{
          background: "transparent",
          color: "var(--foreground)",
        }}
        className="bg-background !text-foreground !font-fira"
      />
    </Gutter>
  );
}
