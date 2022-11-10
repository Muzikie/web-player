import { validateSecretKey } from './validators';

describe('validators', () => {
  describe('validateSecretKey', () => {
    it('should return true for valid mnemonic', () => {
      const result = validateSecretKey('grief like hint ranch steak fuel danger despair submit sadness crack envelope');
      expect(result).toBe(true);
    });

    it('should return false for invalid mnemonic', () => {
      const result = validateSecretKey('invalid value');
      expect(result).toBe(false);
    });
  });
});
