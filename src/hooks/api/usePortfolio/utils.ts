/* eslint-disable @typescript-eslint/no-explicit-any */
import { CoinData, TransactionData, WalletData } from "../../../types/entities";

export const getAllUniqueCoinsInTransactions = ({
  transactions,
}: {
  transactions: TransactionData[];
}) => {
  // transactions have .coinId i need to get all unique coinIds in array of strings
  const coinIds = transactions?.map((transaction) => transaction.coinId);
  const uniqueCoinIds = [...new Set(coinIds)];

  return uniqueCoinIds as Array<string>;
};

export const getWalletBasicData = ({
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

  return {
    ...wallet,
    transactions,
    assets: coins,
    total: {
      transactions: totalTransactions,
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

export const getSanitizedCurrentCoinsData = ({ rawData }: any) => {
  return (
    rawData?.object?.coinsArray.map(({ coin }: any) => ({ ...coin })) || []
  );
};

export const getAllWalletsBasicData = ({
  wallets,
  transactions,
  currentCoinsData,
}: {
  wallets: WalletData[];
  transactions: TransactionData[];
  currentCoinsData: any;
}) => {
  return wallets?.map((wallet) => {
    const walletTransactions = transactions?.filter(
      (transaction) => transaction.walletId === wallet.id
    );

    return getWalletBasicData({
      wallet,
      transactions: walletTransactions,
      currentCoinsData,
    });
  }) as unknown as WalletData[];
};
