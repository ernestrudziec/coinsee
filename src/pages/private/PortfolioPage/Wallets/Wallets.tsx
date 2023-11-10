import { Button, Flex, Typography } from "antd";
import { useEffect, useState } from "react";
import { CreateWalletModal } from "../../../../components/common/modals/CreateWalletModal";
import { PlusOutlined } from "@ant-design/icons";
import { usePortfolio } from "../../../../hooks/api/usePortfolio/usePortfolio";
import { WalletTile } from "./components/WalletTile";

export const Wallets = () => {
  const [isCreateWalletModalOpen, setIsCreateWalletModalOpen] = useState(false);

  const { wallets } = usePortfolio();

  useEffect(() => {
    console.log({ wallets });
  }, [wallets]);

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
        <Flex>
          {wallets?.map((wallet: Wallet) => (
            <WalletTile key={wallet.id} wallet={wallet} />
          ))}
        </Flex>
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
