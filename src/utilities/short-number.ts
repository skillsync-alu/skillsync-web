import { toFixed } from "./to-fixed";

type Sign = "K" | "M" | "B" | "T";

export function shortNumber(num: number): string {
  if (typeof num !== "number") {
    throw new TypeError("Expected a number");
  }

  if (num > 1e19) {
    throw new RangeError("Input expected to be < 1e19");
  }

  if (num < -1e19) {
    throw new RangeError("Input expected to be > -1e19");
  }

  if (Math.abs(num) < 1000) {
    return `${toFixed(num)}`;
  }

  let shortNum: string;
  let exponent: number;
  let size: number;
  const sign = num < 0 ? "-" : "";

  const suffixes: Record<Sign, number> = {
    K: 6,
    M: 9,
    B: 12,
    T: 16
  };

  num = Math.abs(num);
  size = Math.floor(num).toString().length;

  exponent = size % 3 === 0 ? size - 3 : size - (size % 3);
  shortNum = `${toFixed(toFixed(10 * (num / Math.pow(10, exponent))) / 10)}`;

  for (const [suffix, limit] of Object.entries(suffixes) as [Sign, number][]) {
    if (exponent < limit) {
      shortNum = `${shortNum}${suffix}`;
      break;
    }
  }

  return `${sign}${shortNum}`;
}
