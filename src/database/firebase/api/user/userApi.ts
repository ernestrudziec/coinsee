import { createUserProfile } from "./createUserProfile";
import { deleteUserProfile } from "./deleteUserProfile";

export const userApi = {
  create: createUserProfile,
  delete: deleteUserProfile,
};
