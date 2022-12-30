import { renderHook } from '@testing-library/react-hooks';
import { useWS } from './useWS';

describe('useWS', () => {
  it('should call useContext with SocketContext and return values', () => {
    const { result } = renderHook(() => useWS());
    expect(result.current).toEqual({
      ws: null,
      isConnected: false,
      request: expect.any(Function),
    });
  });
});
