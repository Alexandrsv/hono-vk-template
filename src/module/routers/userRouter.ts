import { Hono } from "hono";
import { prisma } from "../../lib/prisma";

export const userRouter = new Hono();

userRouter.get("/", async (c) => {
  const users = await prisma.user.findMany();
  return c.json(users, 200);
});
