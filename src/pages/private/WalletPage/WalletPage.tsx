import { useNavigate, useParams } from "react-router";
import { useEffect } from "react";
import { usePortfolio } from "../../../hooks/api/usePortfolio";
import { Button, Empty, Flex, Spin, Table, Typography } from "antd";
import { ArrowLeftOutlined, WalletFilled } from "@ant-design/icons";

export const WalletPage = () => {
  const params = useParams();
  const navigate = useNavigate();

  const { isLoading, getWalletById } = usePortfolio();

  const walletId = params?.walletId || null;
  const wallet = getWalletById({ walletId });

  useEffect(() => {
    console.log({ wallet });
  }, [wallet]);

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

  if (walletId === null || wallet === undefined) return <Empty />;

  return (
    <Flex vertical style={{ padding: 20 }}>
      <Button
        onClick={() => navigate(-1)}
        style={{ maxWidth: 200, marginBottom: 20 }}
      >
        <ArrowLeftOutlined />
        Go back to wallets
      </Button>
      <Flex vertical style={{ minHeight: "calc(100vh - 178px)" }}>
        <Typography style={{ fontSize: 24, fontWeight: 700 }}>
          <WalletFilled style={{ marginRight: 5, marginLeft: 5 }} />{" "}
          {wallet.name}
        </Typography>
      </Flex>
      <Flex>
        <Table />
      </Flex>
    </Flex>
  );
};
