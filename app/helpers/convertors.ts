import { isObjectLiked } from './helpers';

export const secondToMinutes = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const sec = Math.floor(seconds % 60);

  return `${mins}:${sec.toString().padEnd(2, '0')}`;
};

export const rehydrate = (value: any, defaultValue: any = '') => {
  if (!value) return defaultValue;
  if (value === 'false') return false;
  if (value === 'true') return true;
  if (!isObjectLiked(value)) {
    return value;
  }
  try {
    console.log('parsed');
    return JSON.parse(value);
  } catch (err) {
    return defaultValue;
  }
};

export const hydrate = (value: any) => {
  if (!isObjectLiked(value)) {
    return value;
  }
  return JSON.stringify(value);
};
