import { createTransaction } from "./createTransaction";
import { getAllTransactions } from "./getAllTransactions";
import { getAllTransactionsByWalletId } from "./getAllTransactionsByWalletId";
import { removeTransaction } from "./removeTransaction";

export const transactionApi = {
  create: createTransaction,
  remove: removeTransaction,
  getAll: getAllTransactions,
  getAllByWalletId: getAllTransactionsByWalletId,
};
