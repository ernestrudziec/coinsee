import { ExtraWalletData } from "../../../common/types/entities";

export const getPortfolioTotal = ({
  wallets,
}: {
  wallets: ExtraWalletData[];
}) => {
  const portfolioTotalAmountUsd = wallets.reduce(
    (acc, wallet) => acc + wallet.total.amountUsd.now,
    0
  );

  const portfolioTotalProfit = wallets.reduce(
    (acc, wallet) => acc + wallet.total.profit.amountUsd,
    0
  );

  const portfolioTotalProfitPercentage =
    (portfolioTotalProfit / portfolioTotalAmountUsd) * 100;

  const portfolioTotal = {
    amountUsd: portfolioTotalAmountUsd,
    profit: {
      amountUsd: portfolioTotalProfit,
      percentage: portfolioTotalProfitPercentage,
    },
  };

  return portfolioTotal;
};
