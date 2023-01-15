import { renderHook } from '@testing-library/react-hooks';
import { useActiveSubscription } from './useActiveSubscription';
import { SubscriptionStatus } from './types';

// Mock useAccount hook to return a logged in user
jest.mock('../useAccount/useAccount', () => ({
  useAccount: () => ({
    info: {
      address: 'lskk3qzuz8rpbpqd9j9mwwed2gd2dn39pqpdfgwyh',
    },
  }),
}));
// Mock useWS hook to return a mocked response
jest.mock('../useWS/useWS', () => ({
  useWS: () => ({
    request: jest.fn((method) => {
      if (method === 'subscription_getAccount') {
        return {
          error: false,
          data: {
            subscription: {
              shared: '123',
            },
          },
        };
      }
      return {
        error: false,
        data: {
          price: '1000000000',
          consumable: '800000000',
          streams: 0,
          members: ['lskk3qzuz8rpbpqd9j9mwwed2gd2dn39pqpdfgwyh'],
          maxMembers: 1,
          creatorAddress: 'lskk3qzuz8rpbpqd9j9mwwed2gd2dn39pqpdfgwyh',
        },
      };

    }),
    isConnected: true,
  }),
}));

describe('useActiveSubscription', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return the active subscriptions info, the subscription status and a function to update them', () => {
    const { result } = renderHook(() => useActiveSubscription());

    expect(result.current.subscription).toBeUndefined();
    expect(result.current.subscriptionStatus).toBe(SubscriptionStatus.loading);
    expect(result.current.updateSubscription).toBeInstanceOf(Function);
  });

  it('should load the active subscription info when the user is logged in', async () => {
    const { result } = renderHook(() => useActiveSubscription());

    // Initial state
    expect(result.current.subscriptionStatus).toBe(SubscriptionStatus.loading);
    // Flush promises
    await new Promise((resolve) => setTimeout(resolve, 1));
    // State after retrieval
    expect(result.current.subscriptionStatus).toBe(SubscriptionStatus.subscribed);
    expect(result.current.subscription?.price).toBe('1000000000');
  });
});
