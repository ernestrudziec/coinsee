import { createTransaction } from "./createTransaction";
import { getAllTransactions } from "./getAllTransactions";
import { getAllTransactionsByWalletId } from "./getAllTransactionsByWalletId";
import { deleteTransaction } from "./deleteTransaction";

export const transactionApi = {
  create: createTransaction,
  delete: deleteTransaction,
  getAll: getAllTransactions,
  getAllByWalletId: getAllTransactionsByWalletId,
};
