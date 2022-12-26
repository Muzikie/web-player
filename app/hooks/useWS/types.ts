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

export enum Method {
  auth_getAuthAccount = 'auth_getAuthAccount',
  token_getBalances = 'token_getBalances',
}

export interface DefaultValues {
  [Method.auth_getAuthAccount]: AuthData;
  [Method.token_getBalances]: TokenData;
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

export type RequestResult<T extends Method> = SuccessResponse<T> | ErrorResponse;
