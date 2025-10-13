import PageTitle from "@/components/page-title";
import {
  createFileRoute,
  useLoaderData,
  useNavigate,
} from "@tanstack/react-router";
import Gutter from "@/components/gutter";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./-columns";
import PageLoading from "@/components/page-loading";
import { getAllSocials } from "actions/socials/get-all";

export const Route = createFileRoute("/dashboard/socials/")({
  loader: () => getAllSocials(),
  shouldReload: false,
  staleTime: Infinity,
  component: RouteComponent,
  pendingComponent: PageLoading,
});

function RouteComponent() {
  const navigate = useNavigate();
  const data = useLoaderData({ from: "/dashboard/socials/" }) ?? [];

  return (
    <Gutter>
      <PageTitle title="Socials" description="All the socials I am on." />
      <DataTable
        columns={columns}
        data={data}
        onAdd={() =>
          navigate({
            to: "/dashboard/socials/$socialId",
            params: { socialId: "new" },
          })
        }
      />
    </Gutter>
  );
}
