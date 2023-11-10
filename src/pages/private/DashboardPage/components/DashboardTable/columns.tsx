/* eslint-disable @typescript-eslint/no-explicit-any */
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

export const getColumns = ({
  isMobile,
  onAddClick,
}: GetColumnsParams): ColumnsType<CoinData> => {
  const mobileColumns: ColumnsType<CoinData> = [
    {
      title: "Rank",
      dataIndex: "rank",
      key: "rank",
      sortDirections: ["descend"],
      sorter: true,
      width: 60,
      render: (rank, coin) => {
        return (
          <Flex justify="flex-start" dir="column" align="center">
            <Tooltip title="Add transaction">
              <Button
                shape="circle"
                size="small"
                style={{ marginRight: 16 }}
                onClick={() => onAddClick({ data: coin })}
              >
                <PlusOutlined />
              </Button>
            </Tooltip>
            <span>{rank}</span>
          </Flex>
        );
      },
    },
    {
      title: "Symbol",
      dataIndex: "symbol",
      key: "symbol",
      width: 200,
      render: (symbol, data) => <IconCell symbol={symbol} name={data.name} />,
    },
    {
      title: "Price",
      dataIndex: "priceUsd",
      key: "priceUsd",
      render: (priceUsd) => currency(priceUsd, { separator: "," }).format(),
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
      sorter: true,
    },
  ];

  const desktopColumns: ColumnsType<CoinData> = [
    {
      title: "Market Cap",
      dataIndex: "marketCapUsd",
      key: "marketCapUsd",
      render: (marketCapUsd) =>
        currency(marketCapUsd, { separator: ",", precision: 0 }).format(),
      sortDirections: ["ascend"],
      sorter: true,
    },
    {
      title: "Supply",
      dataIndex: "supply",
      key: "supply",
      render: (supply) =>
        currency(supply, { separator: ",", precision: 0, symbol: "" }).format(),
      sortDirections: ["descend", "ascend"],
      sorter: true,
    },
    {
      title: "Volume (24h)",
      dataIndex: "volumeUsd24Hr",
      key: "volumeUsd24Hr",
      render: (volumeUsd24Hr) =>
        currency(volumeUsd24Hr, { separator: ",", precision: 0 }).format(),
      sortDirections: ["descend", "ascend"],
      sorter: true,
    },
  ];
  return [...mobileColumns, ...(isMobile ? desktopColumns : [])];
};
