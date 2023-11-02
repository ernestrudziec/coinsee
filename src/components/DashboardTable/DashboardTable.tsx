/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from "@apollo/client";
import { Table, Tag, Tooltip } from "antd";
import type { ColumnsType } from "antd/es/table";
import { GET_COINS } from "../../graphql/queries";
import { useSort } from "../../hooks/useSort";
import coinImage from "../../assets/coin64.ico";
import currency from "currency.js";
import { CaretDownOutlined, CaretUpOutlined } from "@ant-design/icons";
import { SORTING_STATE } from "../../utils/config";
import { SORTING_DIR } from "../../constants/constants";

const onlyFavorites = false;
const favorites = ["bitcoin", "ethereum", "tether"];

export type Coin = {
  rank: number;
  id: string;
  name: string;
  symbol: string;
  priceUsd: string;
  changePercent24Hr: string;
  marketCapUsd: string;
  cursor: string;
  supply: string;
  website: string;
  volumeUsd24Hr: string;
};

const columns: ColumnsType<Coin> = [
  {
    title: "Rank",
    dataIndex: "rank",
    key: "rank",
    sortDirections: ["descend"],
    sorter: true,
  },
  {
    title: "Symbol",
    dataIndex: "symbol",
    key: "symbol",
    render: (symbol, data) => {
      return (
        <Tooltip key={symbol} title={data.id.toUpperCase()}>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <img
              style={{ height: "30px", marginRight: "10px" }}
              src={`https://assets.coincap.io/assets/icons/${symbol?.toLowerCase()}@2x.png`} // icon url
              onError={(e: any) => {
                e.target.onError = null;
                e.target.src = coinImage; // fallback if there's no icon in coincap database
              }}
            />
            <span>{symbol}</span>
          </div>
        </Tooltip>
      );
    },
  },
  {
    title: "Price",
    dataIndex: "priceUsd",
    key: "priceUsd",
    render: (priceUsd) => currency(priceUsd, { separator: "," }).format(),
    sortDirections: ["ascend", "descend"],
    sorter: true,
  },
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
  {
    title: "Change",
    dataIndex: "changePercent24Hr",
    key: "changePercent24Hr",
    render: (changePercent24Hr) => {
      const rounded = Math.round(changePercent24Hr * 100) / 100;

      return (
        <Tag color={rounded > 0 ? "green" : "red"}>
          {rounded > 0 ? <CaretUpOutlined /> : <CaretDownOutlined />}
          {rounded}%
        </Tag>
      );
    },
    sortDirections: ["descend", "ascend"],
    sorter: true,
  },
];

export const DashboardTable = () => {
  const { sortBy, sortDir, switchSortingState, switchSortingDir, coinsCount } =
    useSort();

  // const refreshRate = () => 1000 * 15; // means there's an API call every 15 seconds

  const {
    data: dataQuery,
    loading,
    error,
  } = useQuery(GET_COINS, {
    variables: {
      first: coinsCount,
      dir: sortDir,
      sortBy: sortBy,
      before: null,
      after: null,
      where: onlyFavorites ? { id_in: favorites } : null, //  if onlyFavorites are displayed, change the query to return only favorites
    },
  });

  // useEffect(() => {
  //   console.log({ dataQuery, loading, error, sortBy, sortDir });
  // }, [dataQuery, loading, error, sortBy, sortDir]);

  const handleTableChange = (pagination: any, filters: any, sorter: any) => {
    console.log({ pagination, filters, sorter });
    switchSortingState(sorter.order ? sorter.field : SORTING_STATE.rank);
    switchSortingDir(
      sorter.order ? sorter.order + "ing" : SORTING_DIR.descending
    );
  };

  const sanitizedData: Array<Coin> = dataQuery?.object?.coinsArray.map(
    ({ coin, ...extra }: { coin: Coin; cursor: string }) => ({
      id: coin.id,
      rank: coin.rank,
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

  return (
    <Table
      columns={columns}
      dataSource={sanitizedData || []}
      onChange={handleTableChange}
    />
  );
};
