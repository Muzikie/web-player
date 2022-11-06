/* External dependencies */
import { validateMnemonic } from 'bip39';

/**
 * Checks if a given value is a valid mnemonic passphrase
 *
 * @param {string} value - Value to check
 * @returns {boolean} True if valid
 */
export const validateSecretKey = (value: string): boolean =>
  validateMnemonic(value);
