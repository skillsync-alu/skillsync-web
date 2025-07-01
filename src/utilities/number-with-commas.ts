export const numberWithCommas = (input: number | string) => {
  let result = input.toString();

  var pattern = /(-?\d+)(\d{3})/;

  while (pattern.test(result)) {
    result = result.replace(pattern, "$1,$2");
  }

  return result;
};
