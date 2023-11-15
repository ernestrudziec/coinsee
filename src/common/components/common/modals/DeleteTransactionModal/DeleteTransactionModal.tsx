/* eslint-disable @typescript-eslint/no-explicit-any */
import { Modal, Typography } from "antd";

import { useAuth } from "../../../../../context/auth/hooks/useAuth";

import { transactionApi } from "../../../../../database/firebase/api/transaction/transactionApi";

import { BaseModalProps } from "../types";
import { useModal } from "../../../../../context/modal/hooks/useModal";
import { usePortfolio } from "../../../../../context/portfolio/hooks/usePortfolio";

export type DeleteTransactionModalProps = BaseModalProps;

export const DeleteTransactionModal = (props: DeleteTransactionModalProps) => {
  const walletId = props.data?.walletId as string;
  const transactionId = props.data?.transactionId as string;

  const { isOpen } = props;

  const { handleCloseModal } = useModal();
  const { currentUser } = useAuth();
  const {
    general: { refetch },
  } = usePortfolio();

  const handleClose = () => {
    handleCloseModal();
  };

  const handleOk = async () => {
    if (transactionId && walletId !== null) {
      await transactionApi.delete({
        walletId: walletId,
        transactionId: transactionId,
        uid: currentUser.uid,
      });
      handleClose();
      refetch();
    }
  };

  return (
    <>
      <Modal
        title={"Are you sure?"}
        centered
        open={isOpen}
        onOk={handleOk}
        onCancel={handleClose}
        okText="Delete transaction"
      >
        <Typography>Confirm that u want to delete this transaction</Typography>
      </Modal>
    </>
  );
};
