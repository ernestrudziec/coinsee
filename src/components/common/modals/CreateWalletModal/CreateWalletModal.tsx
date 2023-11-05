import { Form, Input, Modal, Row } from "antd";
import { useState } from "react";
import { TransactionType } from "../../../../firebase/api/createTransaction";
import { useAuth } from "../../../../context/auth/useAuth";
import { useNavigate } from "react-router";
import { PrivateRoutePath } from "../../../../router/routes";
import { createWallet } from "../../../../firebase/api/createWallet";

export type CreateWalletModalProps = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
};

export const CreateWalletModal = ({
  isOpen,
  setIsOpen,
}: CreateWalletModalProps) => {
  useState<TransactionType>("BUY");

  const [walletName, setWalletName] = useState<string | null>(null);

  const { currentUser } = useAuth();

  const navigate = useNavigate();

  const handleOk = async () => {
    if (walletName && currentUser?.uid) {
      await createWallet({
        uid: currentUser.uid,
        name: walletName,
      });
      setIsOpen(false);
      navigate(PrivateRoutePath.PORTFOLIO);
    }
  };

  return (
    <>
      <Modal
        title={"Create new wallet"}
        centered
        open={isOpen}
        onOk={handleOk}
        onCancel={() => setIsOpen(false)}
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
