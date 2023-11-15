import { createContext } from "react";
import {
  ExtraWalletData,
  TransactionData,
  WalletData,
} from "../../common/types/entities";

export type PortfolioContextType = {
  general: {
    total: {
      amountUsd: number;
      profit: {
        amountUsd: number;
        percentage: number;
      };
    };
    isLoading: boolean;
    refetch: () => Promise<void>;
    currentCoinsData: WalletData[];
  };
  transactions: {
    data: TransactionData[];
  };
  wallets: {
    data: ExtraWalletData[];
    hasAnyWallet: boolean;
    getWalletById: ({
      walletId,
    }: {
      walletId: string | null;
    }) => ExtraWalletData | undefined;
  };
};

const initialContext = {
  general: {
    total: {
      amountUsd: 0,
      profit: {
        amountUsd: 0,
        percentage: 0,
      },
    },
    isLoading: true,
    refetch: async () => {},
    currentCoinsData: [],
  },
  transactions: {
    data: [],
  },
  wallets: {
    data: [],
    hasAnyWallet: false,
    getWalletById: () => undefined,
  },
};

export const PortfolioContext =
  createContext<PortfolioContextType>(initialContext);
