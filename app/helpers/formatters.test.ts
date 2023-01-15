import {
  formatThousands,
  getYear,
  fromBaseToken,
  toBaseToken,
} from './formatters';

describe('formatters', () => {
  describe('formatThousands', () => {
    it('should format 1000 to 1K', () => {
      expect(formatThousands(1000)).toBe('1K');
    });

    it('should format 1000000 to 1M', () => {
      expect(formatThousands(1000000)).toBe('1M');
    });
  });

  describe('getYear', () => {
    it('convert timestamp to full year string in YYYY format', () => {
      expect(getYear(1600000000)).toBe('2020');
    });
  });

  describe('fromBaseToken', () => {
    it('should convert 100000000 to 1', () => {
      expect(fromBaseToken('100000000')).toBe('1.0000');
    });

    it('should convert 123000000 to 1.23', () => {
      expect(fromBaseToken('123000000')).toBe('1.2300');
    });

    it('should convert 123000000 to 1.23 MZK if token symbol is provided', () => {
      expect(fromBaseToken('123000000', 'MZK')).toBe('1.2300 MZK');
    });
  });

  describe('toBaseToken', () => {
    it('should convert 1 to 100000000', () => {
      expect(toBaseToken('1')).toBe('100000000');
    });

    it('should convert 1.23 to 123000000', () => {
      expect(toBaseToken('1.23')).toBe('123000000');
    });
  });
});
