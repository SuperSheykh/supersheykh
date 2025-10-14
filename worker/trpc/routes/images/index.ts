import { createTRPCRouter as router } from "@worker/trpc/trpc";
import { listImages } from "./list";
import { uploadImage } from "./upload";
import { removeImage } from "./remove";
import { viewImage } from "./view";

export const imagesRouter = router({
  list: listImages,
  upload: uploadImage,
  remove: removeImage,
  view: viewImage,
});
