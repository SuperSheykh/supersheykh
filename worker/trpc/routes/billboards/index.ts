import { createTRPCRouter } from "@worker/trpc/trpc";
import { getAllBillboards } from "./getAll";
import { getBillboard } from "./get";
import { upsertBillboard } from "./upsert";

export const billboardsRouter = createTRPCRouter({
  getAll: getAllBillboards,
  get: getBillboard,
  upsert: upsertBillboard,
});
