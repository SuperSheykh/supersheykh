import { createTRPCRouter as router } from "@worker/trpc/trpc";
import { getAllQuotes } from "./getAll";
import { getQuote } from "./get";
import { getLiveQuotes } from "./get-live";
import { upsertQuote } from "./upsert";

export const quotesRouter = router({
  getAll: getAllQuotes,
  getLive: getLiveQuotes,
  get: getQuote,
  upsert: upsertQuote,
});
