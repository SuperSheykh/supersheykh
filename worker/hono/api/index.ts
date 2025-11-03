import { Env } from "@/types";
import { Hono } from "hono";
import { imagesRoutes } from "./images";
import { bucketRoutes } from "./bucket";

const apiRoutes = new Hono<{ Bindings: Env }>();
apiRoutes.route("/images", imagesRoutes);
apiRoutes.route("/bucket", bucketRoutes);

export default apiRoutes;
