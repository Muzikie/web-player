interface AuthData {
  nonce: string;
  numberOfSignatures: number;
  mandatoryKeys: string[];
  optionalKeys: string[];
}

export interface TokenData {
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
  [key: string]: any;
}

export interface ErrorResponse {
  message: string;
  error: true;
}

export type SuccessResponse = {
  data: TokenData | AuthData;
  error: false;
};
export type RequestResult = SuccessResponse | ErrorResponse;
