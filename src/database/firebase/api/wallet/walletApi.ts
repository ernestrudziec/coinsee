import { addTransactionToWallet } from "./addTransactionToWallet";
import { createWallet } from "./createWallet";
import { deleteWallet } from "./deleteWallet";
import { getAllWallets } from "./getAllWallets";
import { deleteTransactionFromWallet } from "./deleteTransactionFromWallet";

export const walletApi = {
  create: createWallet,
  getAll: getAllWallets,
  delete: deleteWallet,
  transaction: {
    add: addTransactionToWallet,
    delete: deleteTransactionFromWallet,
  },
};
