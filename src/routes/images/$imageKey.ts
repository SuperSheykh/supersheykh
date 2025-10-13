import { createFileRoute } from "@tanstack/react-router";
import { getR2Image } from "actions/images/get-r2-image";

export const Route = createFileRoute("/images/$imageKey")({
  server: {
    handlers: {
      GET: async ({ params }) => {
        return getR2Image({ data: { key: params.imageKey } });
      },
    },
  },
});
