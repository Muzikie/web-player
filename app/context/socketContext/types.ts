import { ReactElement } from 'react';

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

interface AudioData {
  name: string;
  releaseYear: string;
  profileName: string;
  collectionID: string;
  hash: string;
  meta: string;
  owners: any[];
  genre: number[];
  creatorAddress: string;
}

interface CollectionData {
  name: string;
  releaseYear: string;
  profileName: string;
  coProfiles: string[];
  collectionType: number;
  audios: string[];
  hash: string;
  meta: string;
  creatorAddress: string;
}

interface PostTxData {
  transactionID: string;
}

interface BlockEvent {
  module: string;
  name: string;
  topics: string[];
  data: string;
}

export interface DryRunTxData {
  events: BlockEvent[];
  success: boolean;
  result: number;
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

interface SubscriptionAccountData {
  subscription: {
    owned: string[];
    shared: string;
  };
}

export interface SubscriptionData {
  price: string;
  consumable: string;
  streams: string;
  members: string[];
  maxMembers: number;
  creatorAddress: string;
}

export enum Method {
  auth_getAuthAccount = 'auth_getAuthAccount',
  token_getBalances = 'token_getBalances',
  txpool_postTransaction = 'txpool_postTransaction',
  txpool_dryRunTransaction = 'txpool_dryRunTransaction',
  collection_getAccount = 'collection_getAccount',
  collection_getCollection = 'collection_getCollection',
  audio_getAccount = 'audio_getAccount',
  audio_getAudio = 'audio_getAudio',
  subscription_getAccount = 'subscription_getAccount',
  subscription_getSubscription = 'subscription_getSubscription',
}

export interface DefaultValues {
  [Method.auth_getAuthAccount]: AuthData;
  [Method.token_getBalances]: TokenData;
  [Method.txpool_postTransaction]: PostTxData;
  [Method.txpool_dryRunTransaction]: DryRunTxData;
  [Method.collection_getAccount]: CollectionAccountData;
  [Method.collection_getCollection]: CollectionData;
  [Method.audio_getAccount]: AudioAccountData;
  [Method.audio_getAudio]: AudioData;
  [Method.subscription_getAccount]: SubscriptionAccountData;
  [Method.subscription_getSubscription]: SubscriptionData;
}

export interface RequestParams {
  [key: string]: string;
}

export interface ErrorResponse {
  message: string;
  error: true;
}

export interface SuccessResponse<T extends Method> {
  data: DefaultValues[T];
  error: false;
}

export type AuthResponse = SuccessResponse<Method.auth_getAuthAccount> | ErrorResponse;
export type TokenResponse = SuccessResponse<Method.token_getBalances> | ErrorResponse;
export type PostTxResponse = SuccessResponse<Method.txpool_postTransaction> | ErrorResponse;
export type DryRunTxResponse = SuccessResponse<Method.txpool_dryRunTransaction> | ErrorResponse;
export type CollectionAccountResponse = SuccessResponse<Method.collection_getAccount> | ErrorResponse;
export type CollectionResponse = SuccessResponse<Method.collection_getCollection> | ErrorResponse;
export type AudioAccountResponse = SuccessResponse<Method.audio_getAccount> | ErrorResponse;
export type AudioResponse = SuccessResponse<Method.audio_getAudio> | ErrorResponse;
export type SubsAccountResponse = SuccessResponse<Method.subscription_getAccount> | ErrorResponse;
export type SubscriptionResponse = SuccessResponse<Method.subscription_getSubscription> | ErrorResponse;

export type RequestResult<T extends Method> = SuccessResponse<T> | ErrorResponse;

export interface SocketProviderProps {
  children: ReactElement;
}

export interface SocketContextType {
  ws: WebSocket | null;
  isConnected: boolean;
  request: (method: Method, params: RequestParams, id?: string) => Promise<RequestResult<Method>>;
}
