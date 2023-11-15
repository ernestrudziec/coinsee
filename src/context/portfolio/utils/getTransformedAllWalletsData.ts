/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  WalletData,
  TransactionData,
  ExtraWalletData,
} from "../../../common/types/entities";
import { getTransformedSingleWalletData } from "../utils";

export const getTransformedAllWalletsData = ({
  wallets,
  transactions,
  currentCoinsData,
}: {
  wallets: WalletData[];
  transactions: TransactionData[];
  currentCoinsData: any;
}) => {
  const result = wallets?.map((wallet) => {
    const walletTransactions = transactions?.filter(
      (transaction) => transaction.walletId === wallet.id
    );

    return getTransformedSingleWalletData({
      wallet,
      transactions: walletTransactions,
      currentCoinsData,
    });
  }) as unknown as ExtraWalletData[];

  return result.sort((a, b) => {
    return b.total.amountUsd.now - a.total.amountUsd.now;
  });
};
