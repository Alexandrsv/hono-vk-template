import { Hono } from "hono";
import { logger } from "hono/logger";
import { prettyJSON } from "hono/pretty-json";
import { cors } from "hono/cors";
import { appEnvs } from "./lib/appEnvs";
import { z } from "zod";
import { randomUUID } from "crypto";
import { userResponseSchema } from "./modules/schemas/userSchema";
import { userRouter } from "./modules/routers/userRouter";
import { prisma } from "./lib/prisma";
import { authMiddleware } from "./middlewares/authMiddleware";
import { Variables } from "./types/contextVariables";

const app = new Hono<{ Variables: Variables }>().basePath("/api");

app.onError((err, ctx) => {
  if ("format" in err) {
    console.error(JSON.stringify((err as z.ZodError).format(), undefined, 2));
  } else {
    console.error(err);
  }
  return ctx.json({ error: "Internal Server Error" }, 500);
});
app.use("*", async (c, next) => {
  c.set("message", "Hono is cool!!222");
  await next();
});
app.use("*", prettyJSON());
app.use("*", cors());
app.use("*", logger());
app.use("*", authMiddleware);
app.use("*", async (c, next) => {
  const start = Date.now();
  await next();
  const end = Date.now();
  c.res.headers.set("X-Response-Time", `${end - start}`);
});
app.route("/user", userRouter);
app.get("/", async (c) => {
  const user = await prisma.user.create({
    data: {
      name: `Name - ${randomUUID()}`,
      email: `mail@mail.ru - ${randomUUID()}`,
    },
  });
  console.log(c.req.query());
  return c.json(userResponseSchema.safeParse(user), 200);
});
// zValidator("json", z.array(z.string())),
export default {
  port: appEnvs.APP_PORT,
  fetch: app.fetch,
};
