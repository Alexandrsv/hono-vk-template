import { z } from "zod";

export const userResponseSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string(),
});

export const usersResponseSchema = z.array(userResponseSchema);
