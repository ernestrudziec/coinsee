import { useState } from "react";
import { SORTING_STATE, SORTING_DIR } from "../../utils/config";

export const useSort = () => {
  const [sortBy, setSortBy] = useState<string>(SORTING_STATE.rank);
  const [sortDir, setSortDir] = useState(SORTING_DIR.ascending);
  const [coinsCount, setCoinsCount] = useState(20);

  //Switching sorting state
  const switchSortingState = (sortBy: string) => {
    setSortBy(sortBy);
  };

  //Switching sorting direction
  const switchSortingDir = (sortAs: string | number) => {
    setSortDir(SORTING_DIR[sortAs as keyof typeof SORTING_DIR]);
  };

  return {
    sortBy,
    sortDir,
    switchSortingState,
    switchSortingDir,
    coinsCount,
    setCoinsCount,
  };
};
