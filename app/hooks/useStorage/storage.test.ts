import { getStorage } from './storage';

describe('storage', () => {
  describe('Server side', () => {
    it('should return a function to mock localStorage', () => {
      expect(typeof getStorage().getItem).toBe('function');
      expect(typeof getStorage().removeItem).toBe('function');
      expect(typeof getStorage().setItem).toBe('function');
    });
  });

  describe('Client side', () => {
    it('should return localStorage', () => {
      Object.defineProperty(window, 'document', {
        value: {
          cookie: '',
          addEventListener: jest.fn(),
        },
      });
      expect(getStorage()).toEqual(localStorage);
    });
  });
});
