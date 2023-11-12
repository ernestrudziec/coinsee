/* eslint-disable @typescript-eslint/no-explicit-any */
import { Flex, Table } from "antd";

import { AddTransactionModal } from "../../../../../components/common/modals/AddTransactionModal";

import { CoinData } from "../../../../../types/entities";
import { ColumnsType } from "antd/es/table";

export type DashboardTableProps = {
  isAddModalOpen: boolean;
  setIsAddModalOpen: (isOpen: boolean) => void;
  currentCoin: CoinData | null;
  isTableLoading: boolean;
  columns: ColumnsType<CoinData>;
  data: Array<CoinData>;
  onChange: (pagination: any, filters: any, sorter: any) => void;
};

export const DashboardTable = (props: DashboardTableProps) => {
  const {
    isAddModalOpen,
    setIsAddModalOpen,
    currentCoin,
    isTableLoading,
    columns,
    data,
    onChange,
  } = props;

  return (
    <>
      <AddTransactionModal
        isOpen={isAddModalOpen}
        setIsOpen={setIsAddModalOpen}
        data={currentCoin}
      />
      <div
        style={{
          width: "100%",
          height: "100%",
          minHeight: "80vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
        }}
      >
        <Flex
          justify="center"
          align="flex-start"
          style={{
            width: "100%",
            padding: 0,
          }}
        >
          <Table
            style={{ width: "100%" }}
            loading={isTableLoading}
            columns={columns}
            dataSource={data || []}
            onChange={onChange}
            pagination={{ pageSize: 30 }}
          />
        </Flex>
      </div>
    </>
  );
};
