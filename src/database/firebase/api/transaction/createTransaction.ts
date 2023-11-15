import { db } from "../../setup";

import { addDoc, collection } from "firebase/firestore";
import { walletApi } from "../wallet/walletApi";
import { CoinData, TransactionType } from "../../../../common/types/entities";

export type CreateTransactionParams = {
  type: TransactionType;
  coin: CoinData;
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
      const transaction = await addDoc(
        collection(db, "users", uid, "transactions"),
        {
          userId: uid,
          walletId: walletId,
          coinId: coin.id,
          name: coin.name,
          symbol: coin.symbol,
          amount,
          transactionDate,
          type: type,
          amountUsd: Number(Number(coin.priceUsd) * Number(amount)),
          createdAt: new Date(),
        }
      );

      return await walletApi.transaction.add({
        uid,
        walletId,
        transactionId: transaction?.id,
      });
    } catch (e) {
      console.error("Error while creating transaction: ", e);
    }
  }
};
