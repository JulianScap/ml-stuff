function round(number, decimals = 2) {
  const shift = Math.pow(10, decimals);
  return Math.round(number * shift) / shift;
}
export { round };
