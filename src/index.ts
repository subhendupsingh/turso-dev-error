import { Hono } from 'hono';
import { Bindings, Variables } from './bindings';
import { router, trpcServer } from './trpc';
import { createDatabase } from './context';
import { authRouter } from './controllers/auth-controller';

export const db = createDatabase();

const app = new Hono<{ Variables: Variables, Bindings: Bindings }>();

const appRouter = router({
    auth: authRouter,
});

app.use(
    '/trpc/*',
    trpcServer({
        router: appRouter
    })
);

  
app.onError((err, c) => {
    console.log(err);
    console.log("Error caught in universal handler");
    return c.json({ message: err.message, name: err.name }, 500);
});


export type AppRouter = typeof appRouter;
export default app;