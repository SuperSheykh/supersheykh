import { createFileRoute } from "@tanstack/react-router";
export const Route = createFileRoute("/portfolio/$projectId/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/portfolio/$projectId/"!</div>;
}
