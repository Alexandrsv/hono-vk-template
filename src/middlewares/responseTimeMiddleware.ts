import { Context } from "hono";

export const responseTimeMiddleware = async (
  c: Context,
  next: () => Promise<void>,
) => {
  const start = Date.now();
  await next();
  const end = Date.now();
  c.res.headers.set("X-Response-Time", `${end - start}`);
};
