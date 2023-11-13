 
import { Button, Flex, Spin, Statistic, Typography } from "antd";
import { useCallback } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { usePortfolio } from "../../../../hooks/api/usePortfolio/usePortfolio";
import { WalletTile } from "./components/WalletTile";
import { walletApi } from "../../../../firebase/api/wallet/walletApi";
import { useAuth } from "../../../../context/auth/hooks/useAuth";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router";
import { PrivateRoutePath } from "../../../../router/routes";
import { useModal } from "../../../../context/modal/hooks/useModal";
import { ModalType } from "../../../../context/modal/constants";

export const Wallets = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const { wallets, isLoading, refetch, total } = usePortfolio();
  const isPortfolioProfitable = total.profit.amountUsd > 0;

  const { handleOpenModal } = useModal({
    onModalAction: (params) => {
      const shouldRefetch = !!params?.action?.refetchPortfolio;

      if (shouldRefetch && params?.action?.type === ModalType.ADD_WALLET)
        refetch();
    },
  });

  const handleCreateWalletClick = () => {
    handleOpenModal({ type: ModalType.ADD_WALLET });
  };

  const handleDeleteWalletClick = useCallback(
    async ({ userId, walletId }: { userId: string; walletId: string }) => {
      await walletApi.delete({ uid: userId, walletId });
      refetch();
    },
    [refetch]
  );

  const handleViewWalletClick = useCallback(
    async ({ walletId }: { walletId: string }) => {
      navigate(PrivateRoutePath.WALLET + "/" + walletId);
    },
    [navigate]
  );

  if (isLoading)
    return (
      <Flex
        vertical
        style={{ padding: 40, minHeight: "85vh" }}
        align="center"
        justify="center"
      >
        <Spin size="large" />
      </Flex>
    );

  return (
    <>
      {wallets?.length > 0 && (
        <Flex style={{ padding: 20 }} wrap="wrap">
          <Statistic
            title="Total estimate (USD)"
            value={total.amountUsd}
            prefix="$"
            precision={2}
            valueStyle={{ fontSize: 26, fontWeight: 600 }}
          />
          <Statistic
            style={{ marginLeft: 40 }}
            title="Total profit (USD)"
            value={total.profit.amountUsd}
            prefix="$"
            precision={2}
            valueStyle={{ fontSize: 26, fontWeight: 600 }}
          />
          <Statistic
            title={isPortfolioProfitable ? "Profit" : "Loss"}
            value={total.profit.percentage}
            precision={2}
            valueStyle={{
              color: isPortfolioProfitable ? "#3f8600" : "#cf1322",
              fontSize: 26,
            }}
            prefix={
              isPortfolioProfitable ? (
                <ArrowUpOutlined />
              ) : (
                <ArrowDownOutlined />
              )
            }
            style={{ marginLeft: 40 }}
            suffix="%"
          />
        </Flex>
      )}

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

        <Flex wrap="wrap" style={{ marginTop: 20, marginBottom: 5 }}>
          {wallets?.map((wallet) => (
            <WalletTile
              key={wallet.id}
              wallet={wallet}
              onWalletDeleteClick={() =>
                handleDeleteWalletClick({
                  userId: currentUser.uid,
                  walletId: wallet.id,
                })
              }
              onWalletViewClick={() =>
                handleViewWalletClick({ walletId: wallet.id })
              }
            />
          ))}
        </Flex>
      </Flex>
    </>
  );
};
