import { db } from "../../setup";

import { doc, setDoc } from "firebase/firestore";

export type CreateUserParams = {
  email: string;
  uid?: string;
};
export const createUserProfile = async ({ uid, email }: CreateUserParams) => {
  // Add a new document in collection "cities"
  if (uid) {
    try {
      return await setDoc(doc(db, "users", uid), {
        email,
        uid,
        createdAt: new Date(),
      });
    } catch (e) {
      console.error("Error while creating user profile: ", e);
    }
  }
};
