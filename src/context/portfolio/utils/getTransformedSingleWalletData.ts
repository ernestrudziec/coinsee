/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  WalletData,
  TransactionData,
  CoinData,
} from "../../../common/types/entities";
import { getAllUniqueCoinsInTransactions } from "../utils";

export const getTransformedSingleWalletData = ({
  wallet,
  transactions,
  currentCoinsData,
}: {
  wallet: WalletData;
  transactions: TransactionData[];
  currentCoinsData: any;
}) => {
  const walletTransactions = transactions;

  const thenTotalAmountUsd = walletTransactions.reduce(
    (acc, transaction) => acc + transaction.amountUsd,
    0
  );

  const nowTotalAmountUsd = walletTransactions?.reduce(
    (acc: number, transaction: any) => {
      const currentCoin = currentCoinsData?.find(
        (coin: CoinData) => coin.id === transaction.coinId
      );

      if (currentCoin) {
        return acc + Number(currentCoin.priceUsd) * Number(transaction.amount);
      }

      return acc;
    },
    0
  );

  const totalTransactions = walletTransactions?.length || 0;

  const totalProfitAmountUsd = nowTotalAmountUsd - thenTotalAmountUsd;

  const totalProfitPercentage =
    (totalProfitAmountUsd / thenTotalAmountUsd) * 100;

  const coinsIds = getAllUniqueCoinsInTransactions({
    transactions: walletTransactions,
  });

  const coins = coinsIds.map((coinId) => {
    const coin = currentCoinsData?.find((coin: any) => coin.id === coinId);

    const thenAmountUsd = walletTransactions?.reduce(
      (acc: number, transaction) => {
        if (transaction.coinId === coinId) {
          return acc + transaction.amountUsd;
        }

        return acc;
      },
      0
    );

    const coinAmount = walletTransactions?.reduce(
      (acc: number, transaction) => {
        if (transaction.coinId === coinId) {
          return acc + Number(transaction.amount);
        }

        return acc;
      },
      0
    );

    const nowAmountUsd = Number(coin?.priceUsd) * Number(coinAmount) || 0;

    const amountUsd = {
      averageBuyPrice: thenAmountUsd / coinAmount,
      then: thenAmountUsd,
      now: nowAmountUsd,
      percentageChange: (nowAmountUsd / thenAmountUsd) * 100 - 100,
    };

    const percentageOfWallet =
      (Number(nowAmountUsd) / Number(nowTotalAmountUsd)) * 100;

    const totalTransactions = walletTransactions?.filter(
      (transaction) => transaction.coinId === coinId
    ).length;

    const result = {
      coinData: coin,
      total: {
        amount: coinAmount,
        amountUsd,
        percentageOfWallet,
        transactions: totalTransactions,
      },
    };

    return result;
  });

  const totalAssets = coinsIds.length;

  return {
    ...wallet,
    transactions,
    assets: coins,
    total: {
      transactions: totalTransactions,
      assets: totalAssets,
      amountUsd: {
        now: nowTotalAmountUsd,
        then: thenTotalAmountUsd,
      },
      profit: {
        amountUsd: totalProfitAmountUsd,
        percentage: totalProfitPercentage,
      },
    },
  };
};
