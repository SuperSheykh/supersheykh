import { createTRPCRouter } from "@worker/trpc/trpc";
import { getAllBillboards } from "./getAll";
import { getBillboard } from "./get";
import { upsertBillboard } from "./upsert";
import { deleteBillboard } from "./delete";

export const billboardsRouter = createTRPCRouter({
  getAll: getAllBillboards,
  get: getBillboard,
  upsert: upsertBillboard,
  delete: deleteBillboard,
});
