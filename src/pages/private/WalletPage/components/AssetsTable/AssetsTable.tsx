import { Table } from "antd";
import { AssetData, getColumns } from "./columns";
import { Asset } from "../../../../../types/entities";
import { useBreakpoint } from "../../../../../hooks/misc/useBreakpoint";
import { useModal } from "../../../../../context/modal/hooks/useModal";
import { ModalType } from "../../../../../context/modal/constants";

// const columns = [];
export type AssetsTableProps = {
  data: Array<Asset>;
  walletId: string;
};

export const AssetsTable = (props: AssetsTableProps) => {
  const { data: assets, walletId } = props;

  const screens = useBreakpoint();

  const { handleOpenModal } = useModal();

  const columns = getColumns({
    isMobile: !screens.md!,
    onAddClick: ({ data }) =>
      handleOpenModal({
        type: ModalType.ADD_TRANSACTION,
        data: { coin: data, walletId: walletId },
      }),
  });

  const sanitizedData = assets.map(({ coinData: coin, total }) => ({
    key: coin.id,
    id: coin.id,
    rank: coin.rank,
    name: coin.name,
    marketCapUsd: coin.marketCapUsd,
    priceUsd: coin.priceUsd,
    changePercent24Hr: coin.changePercent24Hr,
    symbol: coin.symbol,
    supply: coin.supply,
    website: coin.website,
    volumeUsd24Hr: coin.volumeUsd24Hr,
    totalAmount: total.amount,
    totalAmountUsdNow: total.amountUsd.now,
    totalAmountUsdThen: total.amountUsd.then,
    fraction: total.percentageOfWallet,
    averageBuyPrice: total.amountUsd.averageBuyPrice,
  }));

  const sortedData = sanitizedData.sort((a, b) => {
    return b.fraction - a.fraction;
  }) as unknown as Array<AssetData>;

  return (
    <Table
      style={{ width: "100%" }}
      loading={false}
      columns={columns}
      dataSource={sortedData || []}
      pagination={{ pageSize: 30 }}
    />
  );
};
