import { Context } from "hono";

export const authGuardMiddleware = async (
  c: Context,
  next: () => Promise<void>,
) => {
  const isAuthorized = c.get("isAuthorized");

  if (!isAuthorized) {
    return c.json(
      {
        success: false,
        error: "Unauthorized",
      },
      401,
    );
  }

  await next();
};
