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
  transactionDate: Date | string;
  type: TransactionType;
  amountUsd: number;
  createdAt: Date | string;
};

export type WalletData = {
  id: string;
  name: string;
  transactionIds: Array<string>;
};
