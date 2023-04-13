export enum SubscriptionStatus {
  Loading = 'LOADING',
  Error = 'ERROR',
  Subscribed = 'SUBSCRIBED',
  NotSubscribed = 'NOT_SUBSCRIBED',
  NotLoggedIn = 'NOT_LOGGED_IN',
}

export enum FetchStatus {
  Loading = 'LOADING',
  Error = 'ERROR',
  Success = 'SUCCESS',
}

export enum PurchaseErrors {
  NoSubNFTs = 'No subscriptions available. Try later.',
  InsufficientBalance = 'Insufficient balance. Please top up your account.',
}
