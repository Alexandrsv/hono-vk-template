import { VkAllEvents } from "../../types/vkCallbackEvents";

export const callbackController = (callback: VkAllEvents) => {
  if (callback.type === "confirmation") {
    return "Добавь код в .env и пропиши логику";
  }

  return "ok";
};
