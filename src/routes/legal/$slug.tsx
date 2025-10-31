import { createFileRoute } from "@tanstack/react-router";
import { getPolicy } from "actions/policies";
import Gutter from "@/components/gutter";
import MDRenderer from "@/components/ui/md-renderer";
import { useTranslation } from "react-i18next";

export const Route = createFileRoute("/legal/$slug")({
  loader: ({ params }) => getPolicy({ data: { slug: params.slug } }),
  component: RouteComponent,
});

function RouteComponent() {
  const policy = Route.useLoaderData();
  const {
    i18n: { language },
  } = useTranslation();
  return (
    <Gutter className="py-8">
      <MDRenderer
        source={language === "en" ? policy.content : policy.contentFr}
      />
    </Gutter>
  );
}
