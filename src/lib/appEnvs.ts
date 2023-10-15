import { z } from "zod";

const envSchema = z.object({
  APP_PORT: z.string(),
  VK_APP_SECRET: z.string(),
  ADMIN_VK_IDS: z.string().optional(),
  RATE_API_LIMIT_POINTS_DEFAULT: z
    .string()
    .optional()
    .default("10")
    .transform(Number),
  RATE_API_LIMIT_DURATION_DEFAULT: z
    .string()
    .optional()
    .default("100")
    .transform(Number),
});

const getEnvs = () => {
  return envSchema.parse(Bun.env);
};

export const appEnvs = getEnvs();
