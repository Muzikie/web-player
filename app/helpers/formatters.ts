import BigNumber from 'bignumber.js';

export const formatThousands = (num: number): string => {
  const si = [
    { value: 1E18, sign: 'E' },
    { value: 1E15, sign: 'P' },
    { value: 1E12, sign: 'T' },
    { value: 1E9, sign: 'B' },
    { value: 1E6, sign: 'M' },
    { value: 1E3, sign: 'K' },
  ];

  const signItem = si.find((item) => (num >= item.value));
  return !signItem
    ? num.toString()
    : (num / signItem.value).toFixed(2).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, '$1') + signItem.sign;
};

export const getYear = (num: number): string => {
  const year = new Date(num * 1000).getFullYear();
  return year.toString();
};

export const fromBaseToken = (num: string, token?: string|undefined): string => {
  const formatted = BigNumber(num).dividedBy(BigNumber(1E8)).toFixed(4);
  return token ? `${formatted} ${token}` : formatted;
};

export const toBaseToken = (num: string): string =>
  (BigNumber(num).multipliedBy(BigNumber(1E8))).toFixed(0);

export const truncateAddress = (address: string): string => {
  return address.replace(/^(.{6})(.+)?(.{5})$/, '$1...$3');
};
