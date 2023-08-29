import { LibSQLDatabase, drizzle } from "drizzle-orm/libsql";
import type { inferAsyncReturnType } from '@trpc/server';
import { Context } from "hono";
import { createClient } from "@libsql/client/web";
import * as schema from "./db/schema";

let db: LibSQLDatabase<typeof schema>;

export const createDatabase = () => {
    const client = createClient({ url: "http://127.0.0.1:8080"});
    try {
      if(!db){
        console.log("Creating new database instance");
        db = drizzle(client, {schema});
      }
      return db;
    } catch (error) {
      console.log(error);
      return null;
    }
}

export async function createContext(c: Context) {
    return {
      req: c.req,
      res: c.res,
    };
}

export type TrpcContext = inferAsyncReturnType<typeof createContext>;