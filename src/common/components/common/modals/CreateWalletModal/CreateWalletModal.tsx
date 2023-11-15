import { Form, Input, Modal, Row } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router";
import { WalletFilled } from "@ant-design/icons";

import { useAuth } from "../../../../../context/auth/hooks/useAuth";
import { PrivateRoutePath } from "../../../../../router/routes";
import { walletApi } from "../../../../../database/firebase/api/wallet/walletApi";
import { useModal } from "../../../../../context/modal/hooks/useModal";
import { usePortfolio } from "../../../../../context/portfolio/hooks/usePortfolio";

import { BaseModalProps } from "../types";

export type CreateWalletModalProps = BaseModalProps;

export const CreateWalletModal = (props: CreateWalletModalProps) => {
  const { isOpen } = props;

  const [walletName, setWalletName] = useState<string | null>("");

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
      navigate(PrivateRoutePath.PORTFOLIO);
      handleCloseModal();
    }
  };

  const handleClose = () => {
    setWalletName("");
    handleCloseModal();
  };

  return (
    <>
      <Modal
        title={"Create new wallet"}
        centered
        open={isOpen}
        onOk={handleOk}
        onCancel={handleClose}
        okText="Submit"
        destroyOnClose
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
                  label={
                    <>
                      <WalletFilled style={{ marginRight: 5 }} />
                      Wallet name
                    </>
                  }
                  style={{ marginRight: 16, marginTop: 16 }}
                >
                  <Input
                    name={"walletName"}
                    value={walletName || ""}
                    defaultValue={""}
                    placeholder="Please provide your new wallet name"
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
