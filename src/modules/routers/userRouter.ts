import { Hono } from "hono";
import { prisma } from "../../lib/prisma";
import { usersResponseSchema } from "../schemas/userSchema";
import { Variables } from "../../types/contextVariables";
import { rateLimiterMiddleware } from "../../middlewares/rateLimiterMiddleware";

export const userRouter = new Hono<{ Variables: Variables }>();

userRouter.use("*", rateLimiterMiddleware(true));

userRouter.get("/", async (c) => {
  const users = await prisma.user.findMany();
  return c.json(usersResponseSchema.safeParse(users));
});

userRouter.get("/login", async (c) => {
  const users = await prisma.user.findMany();
  return c.json(usersResponseSchema.safeParse(users), 200);
});
