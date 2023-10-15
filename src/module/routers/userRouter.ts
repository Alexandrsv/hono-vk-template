import { Hono } from "hono";
import { prisma } from "../../lib/prisma";
import { usersResponseSchema } from "../schemas/userSchema";
import { Variables } from "../../index";

export const userRouter = new Hono<{ Variables: Variables }>();

userRouter.get("/", async (c) => {
  console.log(c.get("message"));
  const users = await prisma.user.findMany();
  return c.json(usersResponseSchema.safeParse(users), 200);
});
