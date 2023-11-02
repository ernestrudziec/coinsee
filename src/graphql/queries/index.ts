import { gql } from "@apollo/client";

export const GET_COINS = gql`
  query favCoins(
    $dir: SortDirection
    $sortBy: AssetSortInput
    $before: String
    $after: String
    $where: AssetWhereInput
    $first: Int
  ) {
    marketTotal {
      marketCapUsd
      markets
      exchanges
      exchangeVolumeUsd24Hr
      assets
    }
    object: assets(
      first: $first
      direction: $dir
      sort: $sortBy
      before: $before
      after: $after
      where: $where
    ) {
      loadedCoins: totalCount
      pageInfo {
        hasPreviousPage
        startCursor
        hasNextPage
        endCursor
      }
      coinsArray: edges {
        cursor
        coin: node {
          ...coinData
        }
      }
    }
  }

  fragment coinData on Asset {
    rank
    id
    name
    symbol
    priceUsd
    changePercent24Hr
    marketCapUsd
    volumeUsd24Hr
    website
    supply
  }
`;
