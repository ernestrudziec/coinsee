import { db } from "../../setup";

import { deleteDoc, doc } from "firebase/firestore";
import { walletApi } from "../wallet/walletApi";

export type DeleteTransactionParams = {
  transactionId: string;
  uid?: string;
  walletId: string;
};

export const deleteTransaction = async ({
  walletId,
  transactionId,
  uid,
}: DeleteTransactionParams) => {
  if (uid) {
    try {
      await deleteDoc(doc(db, "users", uid, "transactions", transactionId));

      return await walletApi.transaction.delete({
        uid,
        walletId,
        transactionId,
      });
    } catch (e) {
      console.error("Error while deleting transaction: ", e);
    }
  }
};
