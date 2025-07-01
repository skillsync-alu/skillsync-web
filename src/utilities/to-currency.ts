import { Currency } from "../interfaces";
import { countryCurrencies } from "../constants";
import { shortNumber } from "./short-number";

export const toCurrency = (
  amount: number,
  currency: Currency,
  shouldShorten = false
) => {
  const result = new Intl.NumberFormat(`en-${countryCurrencies[currency]}`, {
    currency,
    style: "currency"
  }).format(amount);

  if (shouldShorten) {
    return `${result.charAt(0)}${shortNumber(amount)}`;
  }

  return result;
};
