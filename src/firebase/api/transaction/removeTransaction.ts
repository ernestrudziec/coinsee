import { db } from "../../setup";

import { deleteDoc, doc } from "firebase/firestore";
import { removeTransactionFromWallet } from "../wallet/removeTransactionFromWallet";
import { walletApi } from "../wallet/walletApi";

export type RemoveTransactionParams = {
  transactionId: string;
  uid?: string;
  walletId: string;
};

export const removeTransaction = async ({
  walletId,
  transactionId,
  uid,
}: RemoveTransactionParams) => {
  if (uid) {
    try {
      await deleteDoc(doc(db, "users", uid, "transactions", transactionId));

      return await walletApi.transaction.remove({
        uid,
        walletId,
        transactionId,
      });
    } catch (e) {
      console.error("Error creating transaction: ", e);
    }
  }
};
