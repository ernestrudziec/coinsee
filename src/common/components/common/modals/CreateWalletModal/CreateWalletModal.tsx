import { Form, Input, Modal, Row } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router";

import { useAuth } from "../../../../../context/auth/hooks/useAuth";
import { PrivateRoutePath } from "../../../../../router/routes";
import { walletApi } from "../../../../../database/firebase/api/wallet/walletApi";
import { BaseModalProps } from "../types";
import { useModal } from "../../../../../context/modal/hooks/useModal";
import { usePortfolio } from "../../../../../context/portfolio/hooks/usePortfolio";

export type CreateWalletModalProps = BaseModalProps;

export const CreateWalletModal = (props: CreateWalletModalProps) => {
  const { isOpen } = props;

  const [walletName, setWalletName] = useState<string | null>(null);

  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const { handleCloseModal } = useModal();

  const {
    general: { refetch },
  } = usePortfolio();

  const handleOk = async () => {
    if (walletName && currentUser?.uid) {
      await walletApi.create({
        uid: currentUser.uid,
        name: walletName,
      });
      refetch();
      handleCloseModal();
      navigate(PrivateRoutePath.PORTFOLIO);
    }
  };

  const handleClose = () => {
    refetch();
    setWalletName(null);
    handleCloseModal();
  };

  return (
    <>
      <Modal
        title={"Create new wallet"}
        centered
        open={isOpen}
        onOk={handleOk}
        onCancel={() => handleClose()}
        okText="Submit"
        okButtonProps={{ disabled: !walletName }}
      >
        {
          <>
            <Form
              style={{ padding: "6px 0px" }}
              autoComplete="on"
              layout="vertical"
            >
              <Row>
                <Form.Item
                  label="Wallet name"
                  style={{ marginRight: 16, marginTop: 16 }}
                >
                  <Input
                    name={"walletName"}
                    onChange={(e) => setWalletName(e.target.value)}
                  />
                </Form.Item>
              </Row>
            </Form>
          </>
        }
      </Modal>
    </>
  );
};
