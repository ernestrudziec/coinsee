export type CoinData = {
  rank: number;
  id: string;
  name: string;
  symbol: string;
  priceUsd: string;
  changePercent24Hr: string;
  marketCapUsd: string;
  cursor: string;
  supply: string;
  website: string;
  volumeUsd24Hr: string;
};

export enum TransactionType {
  BUY = "BUY",
  SELL = "SELL",
}

export type TransactionData = {
  userId: string;
  walletId: string;
  id: string;
  coinId: string;
  name: string;
  symbol: string;
  amount: string | number;
  transactionDate: {
    seconds: number;
    nanoseconds: number;
  };
  type: TransactionType;
  amountUsd: number;
  createdAt: {
    seconds: number;
    nanoseconds: number;
  };
};

export type WalletData = {
  id: string;
  name: string;
  transactionIds: Array<string>;
};

export type ExtraWalletData = {
  id: string;
  createdAt: CreatedAt;
  uid: string;
  transactions: TransactionData[];
  updatedAt: CreatedAt;
  name: string;
  assets: Asset[];
  total: WalletTotal;
};

export type Asset = {
  coinData: CoinData;
  total: AssetTotal;
};

export type AssetTotalUsd = {
  averageBuyPrice: number;
  then: number;
  now: number;
  percentageChange: number;
};

export type AssetTotal = {
  amount: number;
  amountUsd: AssetTotalUsd;
  percentageOfWallet: number;
  transactions: number;
};

export type CreatedAt = {
  seconds: number;
  nanoseconds: number;
};

export type WalletTotal = {
  transactions: number;
  assets: number;
  amountUsd: TotalAmountUsd;
  profit: Profit;
};

export type TotalAmountUsd = {
  now: number;
  then: number;
};

export type Profit = {
  amountUsd: number;
  percentage: number;
};
