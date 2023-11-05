import { Button, Flex, Typography } from "antd";
import { useEffect, useState } from "react";
import { CreateWalletModal } from "../../../../components/common/modals/CreateWalletModal";
import { PlusOutlined } from "@ant-design/icons";
import { useWallets } from "../../../../hooks/api/useWallets";
import { useTransactions } from "../../../../hooks/api/useTransactions";

export const Wallet = ({ name }: { name: string }) => {
  <Flex>
    <Typography style={{ fontSize: 24, fontWeight: 700 }}>
      Wallet {name}
    </Typography>
  </Flex>;
};
export const Wallets = () => {
  const [isCreateWalletModalOpen, setIsCreateWalletModalOpen] = useState(false);

  const { wallets } = useWallets();
  const { transactions } = useTransactions();

  useEffect(() => {
    console.log({ wallets });
    console.log({ transactions });
  }, [wallets, transactions]);

  const handleCreateWalletClick = () => {
    setIsCreateWalletModalOpen(true);
  };

  return (
    <>
      <CreateWalletModal
        isOpen={isCreateWalletModalOpen}
        setIsOpen={setIsCreateWalletModalOpen}
      />
      <Flex vertical style={{ padding: 20, minHeight: "calc(100vh - 178px)" }}>
        <Typography style={{ fontSize: 24, fontWeight: 700 }}>
          Wallets
        </Typography>
        <Button
          style={{ marginTop: 16, maxWidth: 180 }}
          onClick={handleCreateWalletClick}
        >
          <PlusOutlined /> Create new wallet
        </Button>
      </Flex>
    </>
  );
};
