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
  [Method.txpool_postTransaction]: {
    transactionID: '',
  },
  [Method.txpool_dryRunTransaction]: {
    events: [],
    success: false,
  },
  [Method.collection_getAccount]: {
    collection: {
      collections: [],
    },
  },
  [Method.audio_getAccount]: {
    audio: {
      audios: [],
    },
  },
};

export enum EVENTS {
  OPEN = 'open',
  CLOSE = 'close',
  MESSAGE = 'message',
}
