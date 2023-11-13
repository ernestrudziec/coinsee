import { useCallback, useEffect, useState } from "react";
import { useAuth } from "../../../context/auth/hooks/useAuth";
import { walletApi } from "../../../firebase/api/wallet/walletApi";
import { transactionApi } from "../../../firebase/api/transaction/transactionApi";
import {
  ExtraWalletData,
  TransactionData,
  WalletData,
} from "../../../types/entities";
import { useQuery } from "@apollo/client";
import { GET_COINS } from "../../../graphql/queries";

import {
  getAllUniqueCoinsInTransactions,
  getSanitizedCurrentCoinsData,
  getAllWalletsBasicData,
} from "./utils";

export const usePortfolio = () => {
  const [isFirestoreDataLoading, setIsFirestoreDataLoading] = useState(true);

  const { currentUser } = useAuth();

  const [wallets, setWallets] = useState<WalletData[]>([]);
  const [transactions, setTransactions] = useState<TransactionData[]>([]);

  const { data: currentCoinsData, loading: isLoading } = useQuery(GET_COINS, {
    variables: {
      first: 100,
      dir: "ASC",
      sortBy: null,
      before: null,
      after: null,
      where: { id_in: getAllUniqueCoinsInTransactions({ transactions }) || [] }, //  if onlyFavorites are displayed, change the query to return only favorites
    },
  });

  const fetchWalletsAndTransactions = useCallback(async () => {
    setIsFirestoreDataLoading(true);
    try {
      const wallets = await walletApi.getAll({ uid: currentUser?.uid });
      const transactions = await transactionApi.getAll({
        uid: currentUser?.uid,
      });
      setWallets(wallets as WalletData[]);
      setTransactions(transactions as TransactionData[]);
      setIsFirestoreDataLoading(false);
    } catch (err) {
      console.log("Failed to fetch wallets and transactions", err);
    } finally {
      setIsFirestoreDataLoading(false);
    }
  }, [currentUser]);

  useEffect(() => {
    fetchWalletsAndTransactions();
  }, [fetchWalletsAndTransactions, currentUser]);

  const sanitizedCurrentCoinsData = getSanitizedCurrentCoinsData({
    rawData: currentCoinsData,
  });

  const walletsData = getAllWalletsBasicData({
    wallets,
    transactions,
    currentCoinsData: sanitizedCurrentCoinsData,
  }) as unknown as ExtraWalletData[];

  // first not empty wallets, then empty wallets
  const sortedWalletsData = walletsData.sort((a, b) => {
    return b.total.amountUsd.now - a.total.amountUsd.now;
  });

  const portfolioTotalAmountUsd = sortedWalletsData.reduce(
    (acc, wallet) => acc + wallet.total.amountUsd.now,
    0
  );

  const portfolioTotalProfit = sortedWalletsData.reduce(
    (acc, wallet) => acc + wallet.total.profit.amountUsd,
    0
  );

  const portfolioTotalProfitPercentage =
    (portfolioTotalProfit / portfolioTotalAmountUsd) * 100;

  const portfolioTotal = {
    amountUsd: portfolioTotalAmountUsd,
    profit: {
      amountUsd: portfolioTotalProfit,
      percentage: portfolioTotalProfitPercentage,
    },
  };

  const getWalletById = useCallback(
    ({ walletId }: { walletId: string | null }) => {
      return sortedWalletsData.find((wallet) => wallet.id === walletId);
    },
    [sortedWalletsData]
  );

  const portfolio = {
    isLoading: isFirestoreDataLoading || isLoading,
    refetch: fetchWalletsAndTransactions,
    transactions: transactions,
    wallets: sortedWalletsData,
    total: portfolioTotal,
    currentCoinsData: sanitizedCurrentCoinsData,
    hasAnyWallet: wallets?.length > 0,
    getWalletById: getWalletById,
  };

  return portfolio;
};
