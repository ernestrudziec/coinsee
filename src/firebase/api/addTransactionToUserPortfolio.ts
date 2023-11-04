import { Dayjs } from "dayjs";
import { Coin } from "../../components/DashboardTable/types";
import { db } from "../setup";

import { doc, setDoc } from "firebase/firestore";

export type addTransactionToUserPortfolioParams = {
  type: "BUY" | "SELL";
  coin: Coin;
  uid?: string;
  amount: string | number;
  transactionDate: Date;
  wallet: string;
};

export const addTransactionToUserPortfolio = async ({
  type,
  wallet,
  uid,
  coin,
  amount,
  transactionDate,
}: addTransactionToUserPortfolioParams) => {
  if (uid) {
    try {
      return await setDoc(
        doc(
          db,
          "users",
          uid,
          "portfolio",
          wallet,
          "transaction",
          `${type}-${coin.id}-${amount}`
        ),
        {
          id: coin.id,
          name: coin.name,
          symbol: coin.symbol,
          amount,
          transactionDate,
          type: type,
          amountUsd: Number(Number(coin.priceUsd) * Number(amount)),
          createdAt: new Date(),
        }
      );
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }
};
