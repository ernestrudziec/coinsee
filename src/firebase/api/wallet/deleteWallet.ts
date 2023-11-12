import { db } from "../../setup";

import { deleteDoc, doc } from "firebase/firestore";

export type DeleteWalletParams = {
  walletId: string;
  uid: string;
};

export const deleteWallet = async ({ walletId, uid }: DeleteWalletParams) => {
  if (uid) {
    try {
      return await deleteDoc(doc(db, "users", uid, "wallets", walletId));
    } catch (e) {
      console.error("Error while deleting wallet: ", e);
    }
  }
};
