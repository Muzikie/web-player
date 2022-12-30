interface AuthData {
  nonce: string;
  numberOfSignatures: number;
  mandatoryKeys: string[];
  optionalKeys: string[];
}

interface TokenData {
  balances: {
    tokenID: string;
    availableBalance: string;
    lockedBalances: string[];
  }[];
}

interface PostTxData {
  transactionID: string;
}

interface DryRunTxData {
  events: string[];
  success: boolean;
}

interface CollectionAccountData {
  collection: {
    collections: string[];
  };
}

interface AudioAccountData {
  audio: {
    audios: string[];
  };
}

export enum Method {
  auth_getAuthAccount = 'auth_getAuthAccount',
  token_getBalances = 'token_getBalances',
  txpool_postTransaction = 'txpool_postTransaction',
  txpool_dryRunTransaction = 'txpool_dryRunTransaction',
  collection_getAccount = 'collection_getAccount',
  audio_getAccount = 'audio_getAccount',
}

export interface DefaultValues {
  [Method.auth_getAuthAccount]: AuthData;
  [Method.token_getBalances]: TokenData;
  [Method.txpool_postTransaction]: PostTxData;
  [Method.txpool_dryRunTransaction]: DryRunTxData;
  [Method.collection_getAccount]: CollectionAccountData;
  [Method.audio_getAccount]: AudioAccountData;
}

export interface RequestParams {
  [key: string]: string;
}

interface ErrorResponse {
  message: string;
  error: true;
}

export type SuccessResponse<T extends Method> = {
  data: DefaultValues[T];
  error: false;
};

export type AuthResponse = SuccessResponse<Method.auth_getAuthAccount> | ErrorResponse;
export type TokenResponse = SuccessResponse<Method.token_getBalances> | ErrorResponse;
export type PostTxResponse = SuccessResponse<Method.txpool_postTransaction> | ErrorResponse;
export type DryRunTxResponse = SuccessResponse<Method.txpool_dryRunTransaction> | ErrorResponse;
export type CollectionAccountResponse = SuccessResponse<Method.collection_getAccount> | ErrorResponse;
export type AudioAccountResponse = SuccessResponse<Method.audio_getAccount> | ErrorResponse;

export type RequestResult<T extends Method> = SuccessResponse<T> | ErrorResponse;
