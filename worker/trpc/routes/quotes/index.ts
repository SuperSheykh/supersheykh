import { createTRPCRouter as router } from "@worker/trpc/trpc";
import { getAllQuotes } from "./getAll";
import { getQuote } from "./get";
import { upsertQuote } from "./upsert";

export const quotesRouter = router({
  getAll: getAllQuotes,
  get: getQuote,
  upsert: upsertQuote,
});
