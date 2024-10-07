import type { RequestHandler } from './$types';
import { createContext } from '$lib/server/context';
import { appRouter } from '$lib/server/router';
import { fetchRequestHandler } from '@trpc/server/adapters/fetch';

export const GET: RequestHandler = async (event) => {
  return fetchRequestHandler({
    endpoint: '/trpc',
    req: event.request,
    router: appRouter,
    createContext: () => createContext(event),
  });
};

export const POST: RequestHandler = GET;
