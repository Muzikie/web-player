import { renderHook, act } from '@testing-library/react-hooks';

import { useActiveRoute } from './useActiveRoute';

const path = jest.fn(() => ({ pathname: 'my-path' }));
jest.mock('react-router-dom', () => ({
  useLocation: () => path()
}));

describe('useActiveRoute', () => {
  const to = 'my-path';

  it('should return true when path is equal', () => {
    const { result } = renderHook(() => useActiveRoute(to));

    act(() => {
      expect(result.current).toBe(true);
    });
  });
  it('should return false when path is not equal', () => {
    path.mockReturnValueOnce({ pathname: 'new' });
    const { result } = renderHook(() => useActiveRoute(to));

    act(() => {
      expect(result.current).toBe(false);
    });
  });
});
