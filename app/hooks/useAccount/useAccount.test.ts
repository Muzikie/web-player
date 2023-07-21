import { renderHook, act } from '@testing-library/react-hooks';

import { useAccount } from './useAccount';

describe('useAccount', () => {
  it('should return info, setProfileInfo, and updateAccount', () => {
    const { result } = renderHook(() => useAccount());

    act(() => {
      expect(result.current.account).toBeDefined();
      expect(result.current.isLoggedIn).toBeDefined();
    });
  });
});
