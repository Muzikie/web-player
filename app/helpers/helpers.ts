export const greet = (timestamp: number) => {
  const hour = new Date(timestamp).getHours();
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
}

/**
 * Checks if a value is an object or array
 *
 * @param {any} value
 * @returns {boolean} True if the value is an object or array
 */
export const isObjectLiked = (value: any) =>
  value.constructor.name == 'Array' ||
  value.constructor.name == 'Object';
