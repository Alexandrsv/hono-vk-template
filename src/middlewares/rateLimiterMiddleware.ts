import { Context } from "hono";

import { RateLimiterMemory } from "rate-limiter-flexible";
import { appEnvs } from "../lib/appEnvs";

const rateLimiter = new RateLimiterMemory();

export const rateLimiterMiddleware =
  (
    byPath = false,
    points = appEnvs.RATE_API_LIMIT_POINTS_DEFAULT,
    duration = appEnvs.RATE_API_LIMIT_DURATION_DEFAULT,
  ) =>
  async (c: Context, next: () => Promise<void>) => {
    rateLimiter.points = points;
    rateLimiter.duration = duration;

    const adminVkIds = appEnvs.ADMIN_VK_IDS?.split(",") || [];
    const uid = c.var.vkParams!.vk_user_id;

    const path = c.req.path;

    const consumeKey = byPath ? `${uid}:${path}` : uid;

    if (!adminVkIds.includes(uid) || !uid) {
      return next();
    }

    try {
      await rateLimiter.consume(consumeKey);
    } catch (e) {
      return c.json(
        {
          success: false,
          error: "Too many requests",
        },
        429,
      );
    }
    await next();
  };
