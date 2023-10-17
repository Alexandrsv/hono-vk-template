import { Hono } from "hono";
import { callbackController } from "../controllers/callback.controller";

export const callbackRouter = new Hono();

callbackRouter.post("/", async (c) => {
  const body = await c.req.json();
  const response = callbackController(body);

  return c.text(response);
});
