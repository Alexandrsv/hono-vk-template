import { Hono } from "hono";
import { logger } from "hono/logger";
import { poweredBy } from "hono/powered-by";
import { prettyJSON } from "hono/pretty-json";
import { PrismaClient } from "@prisma/client";
import { cors } from "hono/cors";
import { serve } from "bun";
import { appEnvs } from "./lib/appEnvs";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { parseBody } from "hono/dist/types/utils/body";
import { randomUUID } from "crypto";
import { userResponseSchema } from "./module/schemas/userSchema";

const app = new Hono();

app.onError((err, ctx) => {
  if ("format" in err) {
    console.error(JSON.stringify((err as z.ZodError).format(), undefined, 2));
  } else {
    console.error(err);
  }
  return ctx.json({ error: "Internal Server Error" }, 500);
});

const prisma = new PrismaClient();
app.use("*", prettyJSON());
app.use("*", cors());
app.use("*", logger());
app.use("*", async (c, next) => {
  const start = Date.now();
  await next();
  const end = Date.now();
  c.res.headers.set("X-Response-Time", `${end - start}`);
});
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
