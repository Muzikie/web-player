export const formatThousands = (num: number): string => {
  const si = [
    {value: 1E3, sign: 'K'},
    {value: 1E6, sign: 'M'},
    {value: 1E9, sign: 'B'},
    {value: 1E12, sign: 'T'},
    {value: 1E15, sign: 'P'},
    {value: 1E18, sign: 'E'}
  ];

  const signItem = si.find((item) => (num >= item.value));
  return !signItem
    ? num.toString()
    : (num / signItem.value).toFixed(2).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, '$1') + signItem.sign;
};
