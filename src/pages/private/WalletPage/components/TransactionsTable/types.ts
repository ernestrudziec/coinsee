export type TransactionTableRow = {
  key: string;
  id: string;
  coinName: string;
  coinId: string;
  coinSymbol: string;
  type: string;
  amount: number;
  amountUsd: number;
  userId: string;
  walletId: string;
  createdAt: number;
  transactionDate: number;
};

export type TransactionsTableData = Array<TransactionTableRow>;
