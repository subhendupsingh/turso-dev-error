import { db } from "..";
import { employees } from "../db/schema";
import { publicProcedure, router } from "../trpc";


export const authRouter = router({
    set: publicProcedure.mutation(async({ ctx })=>{
        try {
            const result = await db?.insert(employees).values({
                email: "test@gmail.com",
                name: "test",
                id: new Date().getTime().toString()
            }).returning().get();
            console.log("result", result);
            return result;
        } catch (error) {
            console.log(error);
            return null;
        }
    }),
    get: publicProcedure.query(async({ ctx })=>{
        try {
            const result = await db?.select().from(employees).get();
            console.log("result", result);
            return result;
        } catch (error) {
            console.log(error);
            return null;
        }
    })
});