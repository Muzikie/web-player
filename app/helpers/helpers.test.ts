import {
  greet,
  isNil,
  isEmpty,
} from './helpers';

describe('helpers', () => {
  describe('greet', () => {
    it('should say good morning before noon', () => {
      expect(greet(1760000000)).toBe('Good morning');
    });

    it('should say good afternoon before 5pm', () => {
      expect(greet(1600000000)).toBe('Good afternoon');
    });

    it('should say good evening after 5pm', () => {
      expect(greet(1620000000)).toBe('Good evening');
    });
  });

  describe('isNil', () => {
    it('should return true for null', () => {
      expect(isNil(null)).toBe(true);
    });

    it('should return true for undefined', () => {
      expect(isNil(undefined)).toBe(true);
    });

    it('should return false for any other value', () => {
      expect(isNil(0)).toBe(false);
      expect(isNil('')).toBe(false);
      expect(isNil({})).toBe(false);
    });
  });

  describe('isEmpty', () => {
    it('should return true for null', () => {
      expect(isEmpty(null)).toBe(true);
    });

    it('should return true for undefined', () => {
      expect(isEmpty(undefined)).toBe(true);
    });

    it('should return true for empty string', () => {
      expect(isEmpty('')).toBe(true);
    });

    it('should return true for empty object', () => {
      expect(isEmpty({})).toBe(true);
    });

    it('should return false for any other value', () => {
      expect(isEmpty(0)).toBe(false);
      expect(isEmpty('foo')).toBe(false);
      expect(isEmpty({ foo: 'bar' })).toBe(false);
    });
  });
});
