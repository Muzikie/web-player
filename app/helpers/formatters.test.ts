import { formatThousands, getYear } from './formatters';

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
});
