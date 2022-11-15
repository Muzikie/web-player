import { renderHook, act } from '@testing-library/react-hooks';
import { useSession } from './useSession';

describe('useSession', () => {
  describe('setSession', () => {
    afterEach(() => {
      sessionStorage.clear();
    });

    it('should set session', () => {
      const session = { foo: 'bar' };
      const { result } = renderHook(() => useSession());

      expect(result.current.session).toEqual({});
      act(() => {
        result.current.setSession(session);
      });
      expect(sessionStorage.setItem).toHaveBeenCalledWith('@session', '{"foo":"bar"}');
    });

    it('should remove session', () => {
      const { result } = renderHook(() => useSession());

      expect(result.current.session).toEqual({});
      act(() => {
        result.current.setSession({});
      });
      expect(sessionStorage.removeItem).toHaveBeenCalledWith('@session');
    });
  });
});
