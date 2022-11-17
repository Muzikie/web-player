import { renderHook, act } from '@testing-library/react-hooks';
import { useSession } from './useSession';

describe('useSession', () => {
  describe('setSession', () => {
    afterEach(() => {
      sessionStorage.clear();
    });

    it('should set session', () => {
      const session = {
        address: '0x123',
        publicKey: '0x123',
      };
      const { result } = renderHook(() => useSession());

      expect(result.current.session).toEqual({
        address: '',
        publicKey: '',
      });
      act(() => {
        result.current.setSession(session);
        expect(sessionStorage.setItem)
          .toHaveBeenCalledWith('@session', '{"address":"","publicKey":""}');
      });
    });
  });
});
