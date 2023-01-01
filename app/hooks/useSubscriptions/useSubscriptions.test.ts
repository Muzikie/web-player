import { renderHook } from '@testing-library/react-hooks';
import { useSubscriptions } from './useSubscriptions';

describe('useSubscriptions', () => {
  it('should return list of subscriptions and a function to update them', () => {
    const { result } = renderHook(() => useSubscriptions());

    expect(result.current.subscriptions).toEqual([]);
    expect(result.current.getSubscriptions).toBeInstanceOf(Function);
  });
});
