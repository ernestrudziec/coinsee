/* eslint-disable @typescript-eslint/no-explicit-any */

import { useQuery } from "@apollo/client";
import { useState, useCallback, useEffect } from "react";
import { transactionApi } from "../../database/firebase/api/transaction/transactionApi";
import { walletApi } from "../../database/firebase/api/wallet/walletApi";
import { GET_COINS } from "../../database/graphql/queries";

import { WalletData, TransactionData } from "../../common/types/entities";
import { useAuth } from "../auth/hooks/useAuth";
import { PortfolioContext } from "./PortfolioContext";
import {
  getAllUniqueCoinsInTransactions,
  getSanitizedCurrentCoinsData,
  getTransformedAllWalletsData,
} from "./utils";
import { getPortfolioTotal } from "./utils/getPortfolioTotal";

interface PortfolioProviderProps {
  children: React.ReactNode;
}

export const PortfolioProvider = ({ children }: PortfolioProviderProps) => {
  const [isFirestoreDataLoading, setIsFirestoreDataLoading] = useState(true);
  const [wallets, setWallets] = useState<Array<WalletData>>([]);
  const [transactions, setTransactions] = useState<Array<TransactionData>>([]);

  const { currentUser } = useAuth();

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

  const walletsData = getTransformedAllWalletsData({
    wallets,
    transactions,
    currentCoinsData: sanitizedCurrentCoinsData,
  });

  const getWalletById = useCallback(
    ({ walletId }: { walletId: string | null }) => {
      return walletsData.find((wallet) => wallet.id === walletId);
    },
    [walletsData]
  );

  const value = {
    general: {
      total: getPortfolioTotal({ wallets: walletsData }),
      isLoading: isFirestoreDataLoading || isLoading,
      refetch: fetchWalletsAndTransactions,
      currentCoinsData: sanitizedCurrentCoinsData,
    },
    transactions: { data: transactions },
    wallets: {
      data: walletsData,
      hasAnyWallet: wallets?.length > 0,
      getWalletById,
    },
  };

  return (
    <PortfolioContext.Provider value={value}>
      {children}
    </PortfolioContext.Provider>
  );
};
