import { z } from "zod";

export const UserResponseSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string(),
});

export const UsersResponseSchema = z.array(UserResponseSchema);

export type UserResponse = z.infer<typeof UserResponseSchema>;
export type UsersResponse = z.infer<typeof UsersResponseSchema>;

// const UserSchema: z.ZodType<Prisma.UserCreateInput> = z.object({
const UserSchema = z.object({
  vkId: z.string(),
  vkIsAppUser: z.boolean(),
  vkNotificationsEnabled: z.boolean(),
  vkLanguage: z.string(),
  vkRef: z.string(),
  vkAccessTokenSettings: z.string(),
  vkIsFavorite: z.boolean(),
  vkIsRecommended: z.boolean().optional(),
  vkHasProfileButton: z.boolean().optional(),
  isDonator: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
});

export const LoginResponseSchema = UserSchema.omit({
  createdAt: true,
  updatedAt: true,
  vkRef: true,
});

export type LoginResponse = z.infer<typeof LoginResponseSchema>;
