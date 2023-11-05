/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from "@apollo/client";
import { Spin, Table } from "antd";
import { GET_COINS } from "../../../../../graphql/queries";
import { useSort } from "../../../../../hooks/useSort";

import { SORTING_STATE } from "../../../../../utils/config";
import { SORTING_DIR } from "../../../../../constants/constants";
import { useBreakpoint } from "../../../../../hooks/useBreakpoint";
import { AddTransactionModal } from "../../../../../components/common/modals/AddTransactionModal";
import { useState } from "react";
import { Coin } from "./types";
import { getColumns } from "./columns";

const onlyFavorites = false;
const favorites = ["bitcoin", "ethereum", "tether"];

export const DashboardTable = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [currentCoin, setCurrentCoin] = useState<Coin | null>(null);

  const screens = useBreakpoint();
  const { sortBy, sortDir, switchSortingState, switchSortingDir, coinsCount } =
    useSort();

  const { data: dataQuery, loading } = useQuery(GET_COINS, {
    variables: {
      first: coinsCount,
      dir: sortDir,
      sortBy: sortBy,
      before: null,
      after: null,
      where: onlyFavorites ? { id_in: favorites } : null, //  if onlyFavorites are displayed, change the query to return only favorites
    },
  });

  const handleAddClick = ({ data }: { data: Coin }) => {
    setIsAddModalOpen(true);
    setCurrentCoin(data);
  };

  const handleTableChange = (pagination: any, filters: any, sorter: any) => {
    switchSortingState(sorter.order ? sorter.field : SORTING_STATE.rank);
    switchSortingDir(
      sorter.order ? sorter.order + "ing" : SORTING_DIR.descending
    );
  };

  const sanitizedData: Array<Coin> = dataQuery?.object?.coinsArray.map(
    ({ coin, ...extra }: { coin: Coin; cursor: string }) => ({
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
          alignItems: "center",
        }}
      >
        {!loading ? (
          <Table
            style={{
              width: screens.lg ? "95%" : "100%",
              boxShadow: screens.lg
                ? "8px 8px 80px -37px rgba(66, 68, 90, 1)"
                : "",
              overflow: "scroll",
            }}
            columns={columns}
            dataSource={sanitizedData || []}
            onChange={handleTableChange}
          />
        ) : (
          <Spin size="large" />
        )}
      </div>
    </>
  );
};
