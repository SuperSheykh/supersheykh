import { router } from "@worker/trpc/trpc";
import { getAllBillboards } from "./getAll";
import { getBillboard } from "./get";
import { upsertBillboard } from "./upsert";
import { deleteBillboard } from "./delete";

export const billboardsRouter = router({
  getAll: getAllBillboards,
  get: getBillboard,
  upsert: upsertBillboard,
  delete: deleteBillboard,
});
