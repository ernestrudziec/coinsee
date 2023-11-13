import { useNavigate, useParams } from "react-router";
import { usePortfolio } from "../../../hooks/api/usePortfolio";
import { Button, Empty, Flex, Spin, Typography } from "antd";
import {
  ArrowLeftOutlined,
  WalletOutlined,
  AreaChartOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { AssetsTable } from "./components/AssetsTable/AssetsTable";
import { TransactionsTable } from "./components/TransactionsTable";
import { WalletStatistics } from "../../../components/common/wallet/WalletStatistics";

export const WalletPage = () => {
  const params = useParams();
  const navigate = useNavigate();

  const { isLoading, getWalletById } = usePortfolio();

  const walletId = params?.walletId || null;
  const wallet = getWalletById({ walletId });

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

  const assets = wallet?.assets;
  const transactions = wallet?.transactions;

  return (
    <Flex vertical style={{ padding: 20 }}>
      <Button
        onClick={() => navigate(-1)}
        style={{ maxWidth: 200, marginBottom: 20 }}
      >
        <ArrowLeftOutlined />
        Go back to wallets
      </Button>
      <Flex vertical>
        <Typography style={{ fontSize: 24, fontWeight: 700 }}>
          <WalletOutlined style={{ marginRight: 5, marginLeft: 5 }} />{" "}
          {wallet.name}
        </Typography>
        <Flex style={{ margin: "30px 0" }}>
          {wallet?.total && <WalletStatistics data={wallet?.total} extended />}
        </Flex>
      </Flex>
      <Flex vertical>
        <Typography style={{ fontSize: 26, fontWeight: 600, marginBottom: 20 }}>
          <AreaChartOutlined style={{ marginRight: 5 }} />
          Assets
        </Typography>
        <AssetsTable data={assets} walletId={wallet.id} />
        <Typography
          style={{
            fontSize: 26,
            fontWeight: 600,
            marginBottom: 20,
            marginTop: 20,
          }}
        >
          <ShoppingCartOutlined style={{ marginRight: 5 }} /> Transactions
        </Typography>
        <TransactionsTable data={transactions} />
      </Flex>
    </Flex>
  );
};
