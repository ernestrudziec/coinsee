/* eslint-disable @typescript-eslint/no-explicit-any */
import { Flex } from "antd";
import { DashboardTable } from "./components/DashboardTable";
import { getColumns } from "./components/DashboardTable/columns";
import { useQuery } from "@apollo/client";
import { useState } from "react";
import { SORTING_STATE, SORTING_DIR } from "../../../constants/constants";
import { GET_COINS } from "../../../graphql/queries";
import { useBreakpoint } from "../../../hooks/misc/useBreakpoint";
import { useSort } from "../../../hooks/misc/useSort";
import { CoinData } from "../../../types/entities";
import { DashboardStatistics } from "./components/DashboardStatistics";

export const DashboardPage = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [currentCoin, setCurrentCoin] = useState<CoinData | null>(null);

  const screens = useBreakpoint();
  const { sortBy, sortDir, switchSortingState, switchSortingDir } = useSort();

  const { data: dataQuery, loading } = useQuery(GET_COINS, {
    variables: {
      first: 100,
      dir: sortDir,
      sortBy: sortBy,
      before: null,
      after: null,
      where: null,
    },
  });

  const handleAddClick = ({ data }: { data: CoinData }) => {
    setIsAddModalOpen(true);
    setCurrentCoin(data);
  };

  const handleTableChange = (_pagination: any, _filters: any, sorter: any) => {
    switchSortingState(sorter.order ? sorter.field : SORTING_STATE.rank);
    switchSortingDir(
      sorter.order ? sorter.order + "ing" : SORTING_DIR.descending
    );
  };

  const sanitizedData: Array<CoinData> = dataQuery?.object?.coinsArray.map(
    ({ coin, ...extra }: { coin: CoinData; cursor: string }) => ({
      key: coin.id,
      id: coin.id,
      rank: coin.rank,
      name: coin.name,
      marketCapUsd: coin.marketCapUsd,
      priceUsd: coin.priceUsd,
      changePercent24Hr: coin.changePercent24Hr,
      symbol: coin.symbol,
      cursor: extra.cursor,
      supply: coin.supply,
      website: coin.website,
      volumeUsd24Hr: coin.volumeUsd24Hr,
    })
  );

  const columns = getColumns({
    isMobile: screens.md!,
    onAddClick: handleAddClick,
  });

  const dashboardTableProps = {
    isAddModalOpen,
    setIsAddModalOpen,
    currentCoin,
    isTableLoading: loading,
    columns,
    data: sanitizedData,
    onChange: handleTableChange,
  };

  return (
    <Flex vertical>
      <DashboardStatistics marketTotal={dataQuery?.marketTotal} />
      <DashboardTable {...dashboardTableProps} />
    </Flex>
  );
};
