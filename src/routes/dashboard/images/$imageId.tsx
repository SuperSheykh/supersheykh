import {
  createFileRoute,
  useLoaderData,
  useNavigate,
  useParams,
} from "@tanstack/react-router";
import PageLoading from "@/components/page-loading";
import Gutter from "@/components/gutter";
import PageTitle from "@/components/page-title";
import ImageUploader from "@/components/image-uploader";
import { useTRPC } from "@/lib/trpc";

export const Route = createFileRoute("/dashboard/images/$imageId")({
  loader: async ({ params: { imageId }, context: { trpc } }) => {
    if (imageId === "new") return null;
    return trpc.images.view.query({ id: imageId });
  },
  component: RouteComponent,
  pendingComponent: PageLoading,
});

function RouteComponent() {
  const { imageId } = useParams({ from: "/dashboard/images/$imageId" });
  const isNew = imageId === "new";
  const data = useLoaderData({ from: "/dashboard/images/$imageId" });
  const navigate = useNavigate();

  if (isNew) {
    return (
      <Gutter>
        <PageTitle title="Upload Image" description="Upload a new image to use in your content." />
        <ImageUploader onUpload={() => navigate({ to: "/dashboard/images" })} />
      </Gutter>
    );
  }

  if (!data) {
    return <div>Image not found</div>;
  }

  return (
    <Gutter>
      <PageTitle title="Image Details" description={data.filename} />
      <div className="space-y-4">
        <img src={data.url} alt={data.filename} className="max-w-full h-auto rounded-md" />
        <div>
          <p><span className="font-semibold">ID:</span> {data.id}</p>
          <p><span className="font-semibold">URL:</span> <a href={data.url} className="hover:underline" target="_blank" rel="noreferrer">{data.url}</a></p>
          <p><span className="font-semibold">Filename:</span> {data.filename}</p>
          <p><span className="font-semibold">Size:</span> {data.size} bytes</p>
          <p><span className="font-semibold">Uploaded At:</span> {new Date(data.uploadedAt).toLocaleString()}</p>
        </div>
      </div>
    </Gutter>
  );
}
