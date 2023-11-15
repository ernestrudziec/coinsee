import { TransactionData as TransactionDataRAW } from "../../../../../common/types/entities";
import { TransactionsTableData } from "./types";

export const getSanitizedTransactionsTableData = ({
  transactions,
}: {
  transactions: Array<TransactionDataRAW>;
}) => {
  const sanitizedData: TransactionsTableData = transactions.map(
    (transaction) => ({
      key: transaction.id,
      id: transaction.id,
      coinName: transaction.name,
      coinId: transaction.coinId,
      coinSymbol: transaction.symbol,
      type: transaction.type,
      amount: Number(transaction.amount),
      amountUsd: transaction.amountUsd,
      userId: transaction.userId,
      walletId: transaction.walletId,
      createdAt: transaction.createdAt.seconds,
      transactionDate: transaction.transactionDate.seconds,
    })
  );

  const sortedData = sanitizedData.sort((a, b) => {
    return b.transactionDate - a.transactionDate;
  });

  return sortedData;
};
