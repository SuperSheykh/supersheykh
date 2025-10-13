import PageTitle from "@/components/page-title";
import {
  createFileRoute,
  useLoaderData,
  useNavigate,
} from "@tanstack/react-router";
import Gutter from "@/components/gutter";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./-columns";
import { useTRPC } from "@/lib/trpc";
import PageLoading from "@/components/page-loading";
import { useQuery } from "@tanstack/react-query";
import { getAllSkills } from "actions/skills/get-all";

export const Route = createFileRoute("/dashboard/skills/")({
  loader: () => getAllSkills(),
  staleTime: Infinity,
  shouldReload: false,
  component: RouteComponent,
  pendingComponent: PageLoading,
});

function RouteComponent() {
  const navigate = useNavigate();
  const data = useLoaderData({ from: "/dashboard/skills/" }) ?? [];

  return (
    <Gutter>
      <PageTitle title="Skills" description="All the skills I have." />
      <DataTable
        columns={columns}
        data={data ?? []}
        onAdd={() =>
          navigate({
            to: "/dashboard/skills/$skillId",
            params: { skillId: "new" },
          })
        }
      />
    </Gutter>
  );
}
