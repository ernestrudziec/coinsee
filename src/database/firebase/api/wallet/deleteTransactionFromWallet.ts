import { db } from "../../setup";

import { arrayRemove, doc, updateDoc } from "firebase/firestore";

export type DeleteTransactionFromWalletParams = {
  walletId: string;
  transactionId: string;
  uid: string;
};

export const deleteTransactionFromWallet = async ({
  uid,
  walletId,
  transactionId,
}: DeleteTransactionFromWalletParams) => {
  if (uid && walletId && transactionId) {
    try {
      return await updateDoc(doc(db, "users", uid, "wallets", walletId), {
        transactions: arrayRemove(transactionId),
        updatedAt: new Date(),
      });
    } catch (e) {
      console.error("Error deleteing transaction from wallet: ", e);
    }
  }
};
