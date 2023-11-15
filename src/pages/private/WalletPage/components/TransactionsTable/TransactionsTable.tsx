import { Table } from "antd";
import { TransactionData as TransactionDataRAW } from "../../../../../common/types/entities";
import { getTransactionsTableColumns } from "./getTransactionTableColumns";
import { useModal } from "../../../../../context/modal/hooks/useModal";
import { useBreakpoint } from "../../../../../common/hooks/misc/useBreakpoint";
import { ModalType } from "../../../../../context/modal/constants";
import { getSanitizedTransactionsTableData } from "./utils";

export type TransactionsTableProps = {
  data: Array<TransactionDataRAW>;
  walletId: string;
};
export const TransactionsTable = (props: TransactionsTableProps) => {
  const { data: transactions, walletId } = props;

  const screens = useBreakpoint();

  const { handleOpenModal } = useModal();

  const columns = getTransactionsTableColumns({
    isMobile: !screens.md!,
    onDeleteClick: ({ transactionId }: { transactionId: string }) =>
      handleOpenModal({
        type: ModalType.DELETE_TRANSACTION,
        data: { transactionId, walletId },
      }),
  });

  const sanitizedTableData =
    getSanitizedTransactionsTableData({ transactions }) || [];

  return (
    <Table
      style={{ width: "100%" }}
      loading={false}
      columns={columns}
      dataSource={sanitizedTableData}
      pagination={{ pageSize: 30 }}
    />
  );
};
