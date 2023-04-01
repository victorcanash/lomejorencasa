export const roundTwoDecimals = (value: number) => {
  const m = Number((Math.abs(value) * 100).toPrecision(15));
  return (Math.round(m) / 100) * Math.sign(value);
};

export const roundTwoDecimalsToString = (value: number) => {
  const rounded = roundTwoDecimals(value);
  return rounded.toFixed(2);
};
