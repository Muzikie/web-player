export const secondToMinutes = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const sec = Math.floor(seconds % 60);

  return `${mins}:${sec.toString().padEnd(2, '0')}`;
};

export const rehydrate = (value: any, defaultValue: any = '') => {
  if (!value) return defaultValue;
  try {
    return JSON.parse(value);
  } catch (err) {
    return defaultValue;
  }
};

export const hydrate = (value: any) => JSON.stringify(value);

export const bufferize = (value: any) => Buffer.from(value, 'hex');
