import { Context } from "hono";
import { checkVkSignature } from "../lib/checkVkSign";
import { appEnvs } from "../lib/appEnvs";
import { getVkParamsObject } from "../lib/getVkParamsObject";
import { IVkAppParams } from "../types/vkAppParams";

export const authMiddleware = async (c: Context, next: () => Promise<void>) => {
  const authorization = c.req.header("authorization") || null;
  const isAuthorized = checkVkSignature(authorization, appEnvs.VK_APP_SECRET);

  c.set("isAuthorized", isAuthorized);

  if (isAuthorized) {
    c.set("vkParams", getVkParamsObject(authorization) as IVkAppParams);
  }
  await next();
};
