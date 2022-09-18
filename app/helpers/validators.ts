/* External dependencies */
import { Mnemonic } from '@liskhq/lisk-passphrase';

/**
 * Checks if a given value is a valid mnemonic passphrase
 *
 * @param {string} value - Value to check
 * @returns {boolean} True if valid
 */
export const validateSecretKey = (value: string): boolean =>
  Mnemonic.validateMnemonic(value);
