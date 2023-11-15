import { TransactionData } from "../../../common/types/entities";

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
