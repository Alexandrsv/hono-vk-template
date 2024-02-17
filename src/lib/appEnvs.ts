import { z } from "zod";
import * as dotenv from "dotenv";
dotenv.config();

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
  DATABASE_URL: z.string(),
});

const getEnvs = () => {
  return envSchema.parse(process.env);
};

export const appEnvs = getEnvs();
