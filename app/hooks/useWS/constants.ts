import { DefaultValues } from './types';
import { Method } from './types';

export const DEFAULT_VALUES: DefaultValues = {
  [Method.auth_getAuthAccount]: {
    mandatoryKeys: [],
    optionalKeys: [],
    numberOfSignatures: 0,
    nonce: '0',
  },
  [Method.token_getBalances]: {
    balances: [],
  },
};

export enum EVENTS {
  OPEN = 'open',
  CLOSE = 'close',
  MESSAGE = 'message',
}
