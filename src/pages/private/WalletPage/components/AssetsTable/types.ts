export type AssetTableRow = {
  key: string;
  id: string;
  rank: number;
  name: string;
  marketCapUsd: number | string;
  priceUsd: number;
  changePercent24Hr: number;
  symbol: string;
  supply: number;
  website: string;
  volumeUsd24Hr: number;
  totalAmount: number;
  totalAmountUsdNow: number;
  totalAmountUsdThen: number;
  fraction: number;
  averageBuyPrice: number;
};

export type AssetsTableData = Array<AssetTableRow>;
