/* External dependencies */
import { passphrase } from '@liskhq/lisk-client';

/**
 * Checks if a given value is a valid mnemonic passphrase
 *
 * @param {string} value - Value to check
 * @returns {boolean} True if valid
 */
export const validateSecretKey = (value: string): boolean =>
  passphrase.Mnemonic.validateMnemonic(value);
