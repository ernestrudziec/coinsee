import { db } from "../../setup";

import { arrayUnion, doc, updateDoc } from "firebase/firestore";

export type AddTransactionToWalletParams = {
  walletId: string;
  transactionId: string;
  uid: string;
};

export const addTransactionToWallet = async ({
  uid,
  walletId,
  transactionId,
}: AddTransactionToWalletParams) => {
  if (uid && walletId && transactionId) {
    try {
      return await updateDoc(doc(db, "users", uid, "wallets", walletId), {
        transactions: arrayUnion(transactionId),
        updatedAt: new Date(),
      });
    } catch (e) {
      console.error("Error adding transaction to wallet: ", e);
    }
  }
};
