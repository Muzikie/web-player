import type { KeyValue } from '~/configs/types';

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

/*
* @param {any} value
* @returns {boolean}
*/
export const  isNonEmptyBuffer = (value: any): boolean => {
  if (Buffer.isBuffer(value)) {
    console.log('In here', value);
    return value.length > 0;
  }
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

export const removeNullValues = (obj: KeyValue): KeyValue => {
  const newObj: KeyValue = {};
  for (const key in obj) {
    if (obj[key] != null) {
      newObj[key] = obj[key];
    }
  }

  return newObj;
};

export const getFormErrorMessage = (formState): string => {
  const firstErrorKey = Object.keys(formState.errors)[0];

  // Check if there are any errors
  if (!firstErrorKey) {
    return '';
  }

  const firstError = formState.errors[firstErrorKey];

  // Check if the error is for a normal input (non-array input)
  if (Array.isArray(firstError)) {
    // If it's an array, it contains errors for array inputs
    for (const item of firstError) {
      const errorMessage = item && Object.values(item).length ? Object.values(item)[0].message : '';
      if (errorMessage) {
        return errorMessage;
      }
    }
  } else {
    // If it's not an array, it contains the error message for a normal input
    return firstError?.message;
  }

  return ''; // Return null if no error message is found
};
