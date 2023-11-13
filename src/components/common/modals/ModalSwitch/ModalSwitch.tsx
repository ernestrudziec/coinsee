import { ModalType } from "../../../../context/modal/constants";
import { useModal } from "../../../../context/modal/hooks/useModal";
import { AddTransactionModal } from "../AddTransactionModal";
import { CreateWalletModal } from "../CreateWalletModal";

const modals = [
  {
    type: ModalType.ADD_TRANSACTION,
    component: AddTransactionModal,
  },
  {
    type: ModalType.ADD_WALLET,
    component: CreateWalletModal,
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
