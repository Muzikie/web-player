import { getSessionStorage } from './getSessionStorage';

describe('storage', () => {
  describe('Server side', () => {
    it('should return a function to mock localStorage', () => {
      expect(typeof getSessionStorage().getItem).toBe('function');
      expect(typeof getSessionStorage().removeItem).toBe('function');
      expect(typeof getSessionStorage().setItem).toBe('function');
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
      expect(getSessionStorage()).toEqual(localStorage);
    });
  });
});
