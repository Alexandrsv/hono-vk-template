import { IVkAppParams } from "../types/vkAppParams";

export const getVkParamsObject = (params?: string | null) => {
  if (typeof params !== "string") {
    return null;
  }
  const paramsArray = params.split("&");
  if (paramsArray.length === 0) {
    return null;
  }
  return paramsArray.reduce((acc, item) => {
    const [key, value] = item.split("=");
    return { ...acc, [key]: value };
  }, {}) as Partial<IVkAppParams>;
};
