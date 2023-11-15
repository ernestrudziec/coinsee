import { Table } from "antd";
import { getAssetsTableColumns } from "./getAssetsTableColumns";
import { Asset as AssetDataRAW } from "../../../../../common/types/entities";
import { useBreakpoint } from "../../../../../common/hooks/misc/useBreakpoint";
import { useModal } from "../../../../../context/modal/hooks/useModal";
import { ModalType } from "../../../../../context/modal/constants";
import { getSanitizedAssetsTableData } from "./utils";

export type AssetsTableProps = {
  data: Array<AssetDataRAW>;
  walletId: string;
};

export const AssetsTable = (props: AssetsTableProps) => {
  const { data: assets, walletId } = props;

  const screens = useBreakpoint();
  const { handleOpenModal } = useModal();

  const columns = getAssetsTableColumns({
    isMobile: !screens.md!,
    onAddClick: ({ data }) =>
      handleOpenModal({
        type: ModalType.ADD_TRANSACTION,
        data: { coin: data, walletId: walletId },
      }),
  });

  const sanitizedData = getSanitizedAssetsTableData({ assets });

  return (
    <Table
      style={{ width: "100%" }}
      loading={false}
      columns={columns}
      dataSource={sanitizedData}
      pagination={{ pageSize: 30 }}
    />
  );
};
