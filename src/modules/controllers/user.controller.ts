import {
  insertUser,
  InsertUserModel,
  selectUserById,
} from "../services/user.service";
import { IVkAppParams } from "../../types/vkAppParams";

export const loginController = async (vkParams: IVkAppParams) => {
  const user = await selectUserById(vkParams.vk_user_id);

  if (!user) {
    const newUser: InsertUserModel = {
      vkId: vkParams.vk_user_id,
      vkIsAppUser: vkParams.vk_is_app_user === "1",
      vkRef: vkParams.vk_ref,
      vkIsFavorite: vkParams.vk_is_favorite === "1",
      vkAccessTokenSettings: vkParams.vk_access_token_settings,
      vkLanguage: vkParams.vk_language,
      vkHasProfileButton: vkParams.vk_has_profile_button === "1",
      vkIsRecommended: vkParams.vk_is_recommended === "1",
      vkNotificationsEnabled: vkParams.vk_are_notifications_enabled === "1",
    };

    return await insertUser(newUser);
  }

  return user;
};
