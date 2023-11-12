import { addTransactionToWallet } from "./addTransactionToWallet";
import { createWallet } from "./createWallet";
import { deleteWallet } from "./deleteWallet";
import { getAllWallets } from "./getAllWallets";
import { removeTransactionFromWallet } from "./removeTransactionFromWallet";

export const walletApi = {
  create: createWallet,
  getAll: getAllWallets,
  delete: deleteWallet,
  transaction: {
    add: addTransactionToWallet,
    remove: removeTransactionFromWallet,
  },
};
