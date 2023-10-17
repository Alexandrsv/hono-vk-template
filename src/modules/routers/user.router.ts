import { Hono } from "hono";
import { prisma } from "../../lib/prisma";
import { Variables } from "../../types/contextVariables";
import { rateLimiterMiddleware } from "../../middlewares/rateLimiterMiddleware";
import {
  LoginResponseSchema,
  UsersResponseSchema,
} from "../schemas/user.schema";
import { loginController } from "../controllers/user.controller";

export const userRouter = new Hono<{ Variables: Variables }>();

userRouter.use("*", rateLimiterMiddleware(true));

userRouter.get("/", async (c) => {
  const users = await prisma.user.findMany();

  return c.json(UsersResponseSchema.safeParse(users));
});

userRouter.get("/login", async (c) => {
  const user = await loginController(c.get("vkParams")!);

  return c.json(LoginResponseSchema.parse(user), 200);
});
