import type { ColumnsType } from "antd/es/table";
import currency from "currency.js";
import { Flex, Tooltip, Button } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

import { IconCell } from "../../../../../common/components/common/cells/IconCell";
import { TransactionType } from "../../../../../common/types/entities";
import { TransactionTableRow } from "./types";

export type GetTransactionsTableParams = {
  isMobile: boolean;
  onDeleteClick: ({ transactionId }: { transactionId: string }) => void;
};

type TransactionsTableColumns = ColumnsType<TransactionTableRow>;

export const getTransactionsTableColumns = ({
  isMobile,
  onDeleteClick,
}: GetTransactionsTableParams): TransactionsTableColumns => {
  const mobileColumns: TransactionsTableColumns = [
    {
      title: "Bin",
      dataIndex: "remove",
      key: "remove",
      align: "center",
      width: 50,
      ellipsis: true,
      render: (_, transaction) => {
        return (
          <Flex justify="center" dir="column" align="center">
            <Tooltip title="Remove transaction">
              <Button
                shape="circle"
                size="small"
                onClick={() =>
                  onDeleteClick({
                    transactionId: transaction.id,
                  })
                }
              >
                <DeleteOutlined />
              </Button>
            </Tooltip>
          </Flex>
        );
      },
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      align: "center",
      width: 100,
      render: (type) => (
        <Flex justify="center" align="center">
          {type === TransactionType.BUY ? "🟩 - BUY  " : "🟥 - SELL"}
        </Flex>
      ),
      ellipsis: true,

      sorter: (a, b) => {
        return a.type.localeCompare(b.type);
      },
    },
    {
      title: "Asset",
      dataIndex: "coinSymbol",
      key: "coinSymbol",
      width: 100,
      render: (coinSymbol, data) => (
        <IconCell symbol={coinSymbol} name={data.coinName} />
      ),
      sortDirections: ["ascend", "descend"],
      sorter: (a, b) => {
        return a.coinSymbol.localeCompare(b.coinSymbol);
      },
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (amount) =>
        currency(amount, {
          separator: ",",
          precision: 6,
          symbol: "",
        }).format(),
      sortDirections: ["ascend", "descend"],
      sorter: (a, b) => a.amount - b.amount,
      width: 100,
    },
    {
      title: "Total",
      dataIndex: "amountUsd",
      key: "amountUsd",
      render: (amountUsd, transaction) => (
        <span
          style={{
            color: transaction.type === TransactionType.SELL ? "red" : "green",
          }}
        >
          {(transaction.type === TransactionType.SELL ? "- " : "") +
            currency(amountUsd, { separator: "," }).format()}
        </span>
      ),
      sortDirections: ["ascend", "descend"],
      sorter: (a, b) => a.amountUsd - b.amountUsd,
      width: 150,
    },
  ];

  const desktopColumns: TransactionsTableColumns = [
    {
      title: "Transaction Date",
      dataIndex: "transactionDate",
      key: "transactionDate",
      sortDirections: ["descend", "ascend"],
      sorter: (a, b) => {
        return a.transactionDate - b.transactionDate;
      },
      width: 150,
      render: (date) => {
        const dateString = new Date(date * 1000).toLocaleDateString();
        return (
          <Flex justify="flex-start" dir="column" align="center">
            <span>{dateString}</span>
          </Flex>
        );
      },
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      sortDirections: ["descend", "ascend"],
      sorter: (a, b) => {
        return a.createdAt - b.createdAt;
      },
      width: 150,
      render: (date) => {
        const dateString = new Date(date * 1000).toLocaleDateString();
        return (
          <Flex justify="flex-start" dir="column" align="center">
            <span>{dateString}</span>
          </Flex>
        );
      },
    },
  ];

  return [...mobileColumns, ...(!isMobile ? desktopColumns : [])];
};
