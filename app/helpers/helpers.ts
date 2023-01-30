export const greet = (timestamp = 0) => {
  const date = timestamp ? new Date(timestamp) : new Date();
  const hour = date.getHours();
  if (hour < 12) {
    return 'Good morning';
  }
  if (hour < 17) {
    return 'Good afternoon';
  }
  return 'Good evening';
};

/**
 * Returns true if the value is null or undefined.
 *
 * @param {any} value
 * @returns {boolean}
 */
export const isNil = (value: any) => value === null || value === undefined;

/**
 * Returns true if the value is null, undefined, or an empty string, array or object.
 *
 * @param {any} value
 * @returns {boolean}
 */
export const isEmpty = (value: any) => {
  if (isNil(value)) return true;
  if (typeof value === 'string') return value === '';
  if (typeof value === 'object') return Object.keys(value).length === 0;
  return false;
};

/**
 * Checks if a value is an object or array
 *
 * @param {any} value
 * @returns {boolean} True if the value is an object or array
 */
export const isObjectLiked = (value: any) => Array.isArray(value) || typeof value === 'object';

/**
 * Creates a promise to wait for given time in seconds
 *
 * @param {number} seconds - Seconds to wait
 * @returns
 */
export const waitFor = (seconds: number): Promise<void> =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, seconds * 1000);
  });
