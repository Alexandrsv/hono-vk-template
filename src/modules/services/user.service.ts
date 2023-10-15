import { prisma } from "../../lib/prisma";
import { User } from "@prisma/client";

export const selectUserById = async (vkId: string) => {
  return prisma.user.findUnique({
    where: {
      vkId,
    },
  });
};

export type InsertUserModel = Pick<
  User,
  | "vkId"
  | "vkIsAppUser"
  | "vkNotificationsEnabled"
  | "vkLanguage"
  | "vkRef"
  | "vkAccessTokenSettings"
  | "vkIsFavorite"
> &
  Partial<User>;

export const insertUser = async (user: InsertUserModel) => {
  return prisma.user.create({
    data: user,
  });
};
