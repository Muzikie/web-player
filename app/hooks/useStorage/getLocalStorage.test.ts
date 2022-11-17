import { getLocalStorage } from './getLocalStorage';

describe('storage', () => {
  describe('Server side', () => {
    it('should return a function to mock localStorage', () => {
      expect(typeof getLocalStorage().getItem).toBe('function');
      expect(typeof getLocalStorage().removeItem).toBe('function');
      expect(typeof getLocalStorage().setItem).toBe('function');
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
      expect(getLocalStorage()).toEqual(localStorage);
    });
  });
});
