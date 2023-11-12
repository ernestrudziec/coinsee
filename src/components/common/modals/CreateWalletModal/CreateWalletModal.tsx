import { Form, Input, Modal, Row } from "antd";
import { useState } from "react";
import { useAuth } from "../../../../context/auth/hooks/useAuth";
import { useNavigate } from "react-router";
import { PrivateRoutePath } from "../../../../router/routes";
import { walletApi } from "../../../../firebase/api/wallet/walletApi";
import { TransactionType } from "../../../../types/entities";

export type CreateWalletModalProps = {
  isOpen: boolean;
  onClose: ({ refetch }: { refetch: boolean }) => void;
};

export const CreateWalletModal = ({
  isOpen,
  onClose,
}: CreateWalletModalProps) => {
  useState<TransactionType>(TransactionType.BUY);

  const [walletName, setWalletName] = useState<string | null>(null);

  const { currentUser } = useAuth();

  const navigate = useNavigate();

  const handleOk = async () => {
    if (walletName && currentUser?.uid) {
      await walletApi.create({
        uid: currentUser.uid,
        name: walletName,
      });
      onClose({ refetch: true });
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
        onCancel={() => onClose({ refetch: false })}
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
