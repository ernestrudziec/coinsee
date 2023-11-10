import { db } from "../../setup";

import { addDoc, collection } from "firebase/firestore";

export type CreateWalletParams = {
  name: string;
  uid: string;
};

export const createWallet = async ({ name, uid }: CreateWalletParams) => {
  if (uid) {
    try {
      return await addDoc(collection(db, "users", uid, "wallets"), {
        uid: uid,
        name,
        transactions: [],
        createdAt: new Date(),
      });
    } catch (e) {
      console.error("Error while creating wallet: ", e);
    }
  }
};
