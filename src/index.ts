import { Hono } from "hono";
import { logger } from "hono/logger";
import { prettyJSON } from "hono/pretty-json";
import { cors } from "hono/cors";
import { appEnvs } from "./lib/appEnvs";
import { authMiddleware } from "./middlewares/authMiddleware";
import { Variables } from "./types/contextVariables";
import { responseTimeMiddleware } from "./middlewares/responseTimeMiddleware";
import { authGuardMiddleware } from "./middlewares/authGuardMiddleware";
import { userRouter } from "./modules/routers/user.router";
import { callbackRouter } from "./modules/routers/callback.router";
import { serve } from "@hono/node-server";

const app = new Hono<{ Variables: Variables }>().basePath("/api");

// app.onError((err, ctx) => {
//   if ("format" in err) {
//     console.error(JSON.stringify((err as z.ZodError).format(), undefined, 2));
//   } else {
//     console.error(err);
//   }
//   return ctx.json({ error: err }, 500);
// });

app.use("*", cors());
app.use("*", responseTimeMiddleware);
app.use("*", prettyJSON());
app.use("*", logger());

app.route("/callback", callbackRouter);

app.use("*", authMiddleware);

app.use("*", authGuardMiddleware);
app.route("/user", userRouter);

console.log(
  `Приложение запущено 🚀 
http://localhost:${appEnvs.APP_PORT}/api/`,
);

serve({
  port: +appEnvs.APP_PORT,
  fetch: app.fetch,
});
