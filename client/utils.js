export function dateStringInDays(str) {
  let parts = str.split("-").map((e) => Number(e));
  let date = new Date(parts[0], parts[1], parts[2]);

  const ONE_DAY_IN_MS = 24 * 60 * 60 * 1000;
  // Source: https://stackoverflow.com/a/2627493
  return Math.round((date - new Date(1970, 0, 1)) / ONE_DAY_IN_MS);
}

export function prefixPadString(str, char, targetLength) {
  for (let i = str.length; i < targetLength; i++) {
    str = char + str;
  }

  return str;
}

export function dateToString(date) {
  return `${date.getFullYear()}-${prefixPadString(
    String(date.getMonth() + 1),
    "0",
    2
  )}-${prefixPadString(String(date.getDate()), "0", 2)}`;
}
