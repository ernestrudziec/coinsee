import { Table } from "antd";
import { TransactionData } from "../../../../../types/entities";

// const columns = [];

export type TransactionsTableProps = {
  data: TransactionData[];
};
export const TransactionsTable = (props: TransactionsTableProps) => {
  const { data } = props;

  return <Table dataSource={data} />;
};
