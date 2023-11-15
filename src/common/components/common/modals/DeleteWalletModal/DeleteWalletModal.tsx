/* eslint-disable @typescript-eslint/no-explicit-any */
import { Modal, Typography } from "antd";

import { useAuth } from "../../../../../context/auth/hooks/useAuth";

import { walletApi } from "../../../../../database/firebase/api/wallet/walletApi";

import { BaseModalProps } from "../types";
import { useModal } from "../../../../../context/modal/hooks/useModal";
import { usePortfolio } from "../../../../../context/portfolio/hooks/usePortfolio";

export type DeleteWalletModalProps = BaseModalProps;

export const DeleteWalletModal = (props: DeleteWalletModalProps) => {
  const walletId = props.data?.walletId as string;

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
    if (walletId !== null) {
      await walletApi.delete({
        walletId: walletId,
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
        okText="Delete wallet"
      >
        <Typography>
          Please confirm that u want to delete that wallet.
        </Typography>
      </Modal>
    </>
  );
};
