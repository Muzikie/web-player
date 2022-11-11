import { greet } from './helpers';

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
});
