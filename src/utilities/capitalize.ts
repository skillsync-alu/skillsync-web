export const capitalize = (input: string) => {
  if (!input) {
    return "";
  }

  return input
    .replace(/([A-Z])/g, " $1")
    .trim()
    .replace(/\band\b/gi, "&")
    .replace(/\b\w/g, char => char.toUpperCase());
};
