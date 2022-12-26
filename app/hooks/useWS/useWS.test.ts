import { renderHook, act } from '@testing-library/react-hooks';
import { useWS } from './useWS';
import { Method } from './types';


describe('useWS', () => {
  it('should be defined', () => {
    expect(useWS).toBeDefined();
  });

  it('should return an instance of ws connection, and the isConnected state, and a request function', () => {
    const { result } = renderHook(() => useWS());
    act(() => {
      expect(result.current.ws).toBeDefined();
      expect(typeof result.current.isConnected === 'boolean').toBeTruthy();
      console.log(result.current.isConnected)
      expect(typeof result.current.request === 'function').toBeTruthy();
    });
  });

  describe('request', () => {
    it('should reject the promise if the ws connection is not established', async () => {
      const { result } = renderHook(() => useWS());

      act(() => {
        expect(typeof result.current.request === 'function').toBeTruthy();
        result.current.request(
          Method.auth_getAuthAccount,
          { address: 'lsk3ay4z7wqjczbo5ogcqxgxx23xyacxmycwxfh4d' },
        ).catch((err) => {
          console.log('err', err);
          expect(err.error).toBe(true);
        });
      });
    });
  });
});
