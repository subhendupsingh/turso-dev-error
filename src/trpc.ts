import { initTRPC } from '@trpc/server';
import type { AnyRouter } from '@trpc/server'
import type { FetchHandlerRequestOptions } from '@trpc/server/adapters/fetch'
import { fetchRequestHandler } from '@trpc/server/adapters/fetch'
import type { MiddlewareHandler } from 'hono'
import { TrpcContext, createContext } from './context';
import { OpenApiMeta } from 'trpc-openapi';

const t = initTRPC.meta<OpenApiMeta>().context<TrpcContext>().create();
export const publicProcedure = t.procedure;
export const router = t.router;
export const mergeRouters = t.mergeRouters;
export const middleware = t.middleware;

type tRPCOptions = Omit<FetchHandlerRequestOptions<AnyRouter>, 'req' | 'endpoint'> & Partial<Pick<FetchHandlerRequestOptions<AnyRouter>, 'endpoint'>>

export const trpcServer = ({ endpoint = '/trpc', ...rest }: tRPCOptions): MiddlewareHandler => {
  return async (c) => {
    const res = fetchRequestHandler({
      createContext: ({ req }) => createContext(c),
      ...rest,
      endpoint,
      req: c.req.raw,
    })
    return res
  }
}

