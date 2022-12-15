import { getSession, commitSession, destroySession } from './index';

describe('useSession', () => {
  it('should export a getSession, commitSession, and destroySession functions', () => {
    expect(getSession).toBeInstanceOf(Function);
    expect(commitSession).toBeInstanceOf(Function);
    expect(destroySession).toBeInstanceOf(Function);
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
