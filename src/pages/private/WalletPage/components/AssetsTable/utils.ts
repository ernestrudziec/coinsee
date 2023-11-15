import { Asset as AssetDataRAW } from "../../../../../common/types/entities";
import { AssetsTableData } from "./types";

export const getSanitizedAssetsTableData = ({
  assets,
}: {
  assets: Array<AssetDataRAW>;
}) => {
  const sanitizedData = assets.map(({ coinData: coin, total }) => ({
    key: coin.id,
    id: coin.id,
    rank: coin.rank,
    name: coin.name,
    marketCapUsd: coin.marketCapUsd,
    priceUsd: coin.priceUsd as string,
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
  })) as unknown as AssetsTableData;

  const sortedData = sanitizedData.sort((a, b) => {
    return b.fraction - a.fraction;
  });

  return sortedData;
};
