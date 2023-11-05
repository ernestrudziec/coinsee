import { Coin } from "../../pages/private/DashboardPage/components/DashboardTable/types";
import { db } from "../setup";

import { addDoc, collection, doc, setDoc } from "firebase/firestore";

export type TransactionType = "BUY" | "SELL";

export type CreateTransactionParams = {
  type: TransactionType;
  coin: Coin;
  uid?: string;
  amount: string | number;
  transactionDate: Date;
  walletId: string;
};

export const createTransaction = async ({
  type,
  walletId,
  uid,
  coin,
  amount,
  transactionDate,
}: CreateTransactionParams) => {
  if (uid) {
    try {
      return await addDoc(collection(db, "users", uid, "transactions"), {
        userId: uid,
        walletId: walletId,
        id: coin.id,
        name: coin.name,
        symbol: coin.symbol,
        amount,
        transactionDate,
        type: type,
        amountUsd: Number(Number(coin.priceUsd) * Number(amount)),
        createdAt: new Date(),
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }
};
