import { User, deleteUser } from "firebase/auth";
import { db } from "../../setup";

import { deleteDoc, doc } from "firebase/firestore";

export type DeleteUserParams = {
  currentUser: User;
};
export const deleteUserProfile = async ({ currentUser }: DeleteUserParams) => {
  if (currentUser) {
    try {
      await deleteDoc(doc(db, "users", currentUser.uid));
      return await deleteUser(currentUser);
    } catch (e) {
      console.error("Error while deleteing user profile: ", e);
      return e;
    }
  }
};
