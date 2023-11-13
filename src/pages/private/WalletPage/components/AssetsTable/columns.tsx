import type { ColumnsType } from "antd/es/table";
import currency from "currency.js";
import { Flex, Tooltip, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { ChangeCell } from "../../../../../components/common/cells/ChangeCell";
import { IconCell } from "../../../../../components/common/cells/IconCell";
import { CoinData } from "../../../../../types/entities";

export type GetColumnsParams = {
  isMobile: boolean;
  onAddClick: ({ data }: { data: CoinData }) => void;
};

export type AssetData = {
  key: string;
  id: string;
  rank: number;
  name: string;
  marketCapUsd: number;
  priceUsd: number;
  changePercent24Hr: number;
  symbol: string;
  supply: number;
  website: string;
  volumeUsd24Hr: number;
  totalAmount: number;
  totalAmountUsdNow: number;
  totalAmountUsdThen: number;
  fraction: number;
  averageBuyPrice: number;
};

export const getColumns = ({
  isMobile,
  onAddClick,
}: GetColumnsParams): ColumnsType<AssetData> => {
  const mobileColumns: ColumnsType<AssetData> = [
    {
      title: "Fraction",
      dataIndex: "fraction",
      key: "fraction",
      sortDirections: ["descend"],
      sorter: true,
      width: 140,
      render: (fraction, coin) => {
        return (
          <Flex justify="flex-start" dir="column" align="center">
            <Tooltip title="Add transaction">
              <Button
                shape="circle"
                size="small"
                style={{ marginRight: 16 }}
                onClick={() =>
                  onAddClick({ data: coin as unknown as CoinData })
                }
              >
                <PlusOutlined />
              </Button>
            </Tooltip>
            <span>
              {currency(fraction, {
                separator: ",",
                symbol: "",
                precision: 2,
              }).format()}
              {"%"}
            </span>
          </Flex>
        );
      },
    },
    {
      title: "Symbol",
      dataIndex: "symbol",
      key: "symbol",
      width: 100,
      render: (symbol, data) => <IconCell symbol={symbol} name={data.name} />,
    },
    {
      title: "Amount",
      dataIndex: "totalAmount",
      key: "totalAmount",
      render: (priceUsd) =>
        currency(priceUsd, {
          separator: ",",
          precision: 6,
          symbol: "",
        }).format(),
      sortDirections: ["ascend", "descend"],
      sorter: true,
      width: 150,
    },
    {
      title: "Change",
      dataIndex: "changePercent24Hr",
      key: "changePercent24Hr",
      width: 150,
      render: (changePercent24Hr) => (
        <ChangeCell changePercent24Hr={changePercent24Hr} />
      ),
      sortDirections: ["descend", "ascend"],
      sorter: (a, b) => a.changePercent24Hr - b.changePercent24Hr,
    },
    {
      title: "All-time profit",
      dataIndex: "totalAmountUsdNow",
      key: "totalAmountUsdNow",
      render: (priceUsd) => currency(priceUsd, { separator: "," }).format(),
      sortDirections: ["ascend", "descend"],
      sorter: (a, b) => a.totalAmountUsdNow - b.totalAmountUsdNow,
      width: 150,
    },
  ];

  const desktopColumns: ColumnsType<AssetData> = [
    {
      title: "Invested",
      dataIndex: "totalAmountUsdThen",
      key: "totalAmountUsdThen",
      render: (priceUsd) => currency(priceUsd, { separator: "," }).format(),
      sortDirections: ["ascend", "descend"],
      sorter: (a, b) => a.totalAmountUsdThen - b.totalAmountUsdThen,
      width: 150,
    },
    {
      title: "Average Buy Price",
      dataIndex: "averageBuyPrice",
      key: "averageBuyPrice",
      render: (marketCapUsd) =>
        currency(marketCapUsd, { separator: ",", precision: 2 }).format(),
      sortDirections: ["ascend"],
      sorter: (a, b) => a.averageBuyPrice - b.averageBuyPrice,
    },
  ];
  return [...mobileColumns, ...(!isMobile ? desktopColumns : [])];
};
