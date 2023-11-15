/* eslint-disable @typescript-eslint/no-explicit-any */

export const getSanitizedCurrentCoinsData = ({ rawData }: any) => {
  return (
    rawData?.object?.coinsArray.map(({ coin }: any) => ({ ...coin })) || []
  );
};
