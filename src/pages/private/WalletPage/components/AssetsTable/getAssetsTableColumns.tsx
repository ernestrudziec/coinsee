import type { ColumnsType } from "antd/es/table";
import currency from "currency.js";
import { Flex, Tooltip, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { ChangeCell } from "../../../../../common/components/common/cells/ChangeCell";
import { IconCell } from "../../../../../common/components/common/cells/IconCell";
import { CoinData } from "../../../../../common/types/entities";
import { AssetTableRow } from "./types";

export type GetColumnsParams = {
  isMobile: boolean;
  onAddClick: ({ data }: { data: CoinData }) => void;
};

type AssetsTableColumns = ColumnsType<AssetTableRow>;

export const getAssetsTableColumns = ({
  isMobile,
  onAddClick,
}: GetColumnsParams): AssetsTableColumns => {
  const mobileColumns: AssetsTableColumns = [
    {
      title: "Add",
      dataIndex: "add",
      key: "add",
      align: "center",
      width: 50,
      render: (_, coin) => {
        return (
          <Flex justify="center" dir="column" align="center">
            <Tooltip title="Add transaction">
              <Button
                shape="circle"
                size="small"
                onClick={() =>
                  onAddClick({ data: coin as unknown as CoinData })
                }
              >
                <PlusOutlined />
              </Button>
            </Tooltip>
          </Flex>
        );
      },
    },
    {
      title: "Fraction",
      dataIndex: "fraction",
      key: "fraction",
      sortDirections: ["descend", "ascend"],
      sorter: (a, b) => b.fraction - a.fraction,
      width: 50,
      render: (fraction) => {
        return (
          <Flex justify="flex-start" dir="column" align="center">
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
      title: "Asset",
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
      sorter: (a, b) => a.totalAmount - b.totalAmount,
      width: 150,
    },
    {
      title: "Change",
      dataIndex: "changePercent24Hr",
      key: "changePercent24Hr",
      width: 50,
      render: (_, coin) => (
        <ChangeCell
          changePercent24Hr={
            ((coin.totalAmountUsdNow - coin.totalAmountUsdThen) /
              coin.totalAmountUsdThen) *
            100
          }
        />
      ),
      sortDirections: ["descend", "ascend"],
      sorter: (a, b) => a.changePercent24Hr - b.changePercent24Hr,
    },
    {
      title: "Total",
      dataIndex: "totalAmountUsdNow",
      key: "totalAmountUsdNow",
      render: (priceUsd) => currency(priceUsd, { separator: "," }).format(),
      sortDirections: ["ascend", "descend"],
      sorter: (a, b) => a.totalAmountUsdNow - b.totalAmountUsdNow,
      width: 150,
    },
  ];

  const desktopColumns: AssetsTableColumns = [
    {
      title: "Average Buy Price",
      dataIndex: "averageBuyPrice",
      key: "averageBuyPrice",
      render: (marketCapUsd) =>
        currency(marketCapUsd, { separator: ",", precision: 2 }).format(),
      sortDirections: ["ascend"],
      sorter: (a, b) => a.averageBuyPrice - b.averageBuyPrice,
      width: 150,
    },
    {
      title: "Invested",
      dataIndex: "totalAmountUsdThen",
      key: "totalAmountUsdThen",
      render: (priceUsd) => currency(priceUsd, { separator: "," }).format(),
      sortDirections: ["ascend", "descend"],
      sorter: (a, b) => a.totalAmountUsdThen - b.totalAmountUsdThen,
      width: 150,
    },
  ];

  return [...mobileColumns, ...(!isMobile ? desktopColumns : [])];
};
