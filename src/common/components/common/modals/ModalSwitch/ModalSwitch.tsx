import { ModalType } from "../../../../../context/modal/constants";
import { useModal } from "../../../../../context/modal/hooks/useModal";

import { AddTransactionModal } from "../AddTransactionModal";
import { CreateWalletModal } from "../CreateWalletModal";
import { DeleteTransactionModal } from "../DeleteTransactionModal";
import { DeleteWalletModal } from "../DeleteWalletModal";
import { DeleteAccountModal } from "../DeleteAccountModal";

const modals = [
  {
    type: ModalType.ADD_TRANSACTION,
    component: AddTransactionModal,
  },
  {
    type: ModalType.DELETE_TRANSACTION,
    component: DeleteTransactionModal,
  },
  {
    type: ModalType.ADD_WALLET,
    component: CreateWalletModal,
  },
  {
    type: ModalType.DELETE_WALLET,
    component: DeleteWalletModal,
  },
  {
    type: ModalType.DELETE_ACCOUNT,
    component: DeleteAccountModal,
  },
];

export const ModalSwitch = () => {
  const { currentModal } = useModal();

  return (
    <>
      {modals.map(({ type, component: ModalComponent }) => {
        return (
          <ModalComponent
            key={type}
            data={currentModal?.data}
            isOpen={currentModal?.type === type}
          />
        );
      })}
    </>
  );
};
