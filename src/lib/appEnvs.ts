import { Env } from "bun";
import { z } from "zod";

const envSchema = z.object({
  APP_PORT: z.string(),
  VK_APP_SECRET: z.string(),
});

const getEnvs = () => {
  return envSchema.parse(Bun.env);
};

export const appEnvs = getEnvs();
