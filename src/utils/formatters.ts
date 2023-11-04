import currency from "currency.js";

export const getUsd = (value: number) => {
  return currency(value, { separator: "," }).format();
};
