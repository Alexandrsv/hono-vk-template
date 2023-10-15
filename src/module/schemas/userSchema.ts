import { z } from "zod";

export const userResponseSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string(),
});

export const usersResponseSchema = z.array(userResponseSchema);

export type UserResponse = z.infer<typeof userResponseSchema>;
export type UsersResponse = z.infer<typeof usersResponseSchema>;
