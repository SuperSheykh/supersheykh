import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import { appRouter } from '../../server/routers';
import sql from '../../server/db';

export const GET = async ({ req }: { req: Request }) => {
  return fetchRequestHandler({
    endpoint: '/api/trpc',
    req,
    router: appRouter,
    createContext: () => ({ db: sql }),
  });
};

export const POST = async ({ req }: { req: Request }) => {
  return fetchRequestHandler({
    endpoint: '/api/trpc',
    req,
    router: appRouter,
    createContext: () => ({ db: sql }),
  });
};
