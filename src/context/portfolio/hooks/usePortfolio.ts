import { useContext } from "react";
import { PortfolioContext } from "../PortfolioContext";

export const usePortfolio = () => {
  const portfolioContext = useContext(PortfolioContext);

  if (!portfolioContext) {
    throw new Error("usePortfolio must be used within PortfolioProvider");
  }

  return portfolioContext;
};
