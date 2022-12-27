import { getSession, commitSession, destroySession } from './index';

jest.mock('@remix-run/node', () => ({
  createCookieSessionStorage: jest.fn(() => ({
    getSession: jest.fn(),
    commitSession: jest.fn(),
    destroySession: jest.fn(),
  })),
}));

describe('useSession', () => {
  it('should export a getSession, commitSession, and destroySession functions', () => {
    expect(typeof getSession).toBe('function');
    expect(typeof commitSession).toBe('function');
    expect(typeof destroySession).toBe('function');
  });

  describe('getSession', () => {
    it.todo('should return a session object');
  });

  describe('commitSession', () => {
    it.todo('should commit a session object');
  });

  describe('destroySession', () => {
    it.todo('should destroy a session object');
  });
});
