import { createFileRoute } from "@tanstack/react-router";
import { getR2Image } from "actions/images/get-r2-image";
import { deleteR2Image } from "actions/images/delete-r2-image";

export const Route = createFileRoute("/images/$key")({
  server: {
    handlers: {
      GET: async ({ params }) => {
        return getR2Image({ data: { key: params.key } });
      },
      DELETE: async ({ params }) => {
        return deleteR2Image({ data: { key: params.key } });
      },
    },
  },
});
