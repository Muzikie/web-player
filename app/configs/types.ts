interface BaseEntity {
  creatorAddress: string;
  name: string;
}

interface LoyaltyOwner {
  address: string;
  shares: number;
  income: string;
}

export enum CollectionType {
  Album = 1,
  PodcastSeries = 2,
}

export type Collection = {
  collectionType: CollectionType;
  audios: string[];
  releaseYear: string;
  collectionID: string;
  coverSignature: string;
  coverHash: string;
} & BaseEntity

export enum SocialAccountPlatform {
  Instagram = 0,
  Twitter = 1,
  Youtube = 2,
}

export const socialPlatformNames = ['instagram', 'twitter', 'youtube'];

export interface SocialAccount {
  username: string;
  platform: SocialAccountPlatform;
}

export type Profile = {
  name: string;
  nickName: string;
  description: string;
  avatarHash: string;
  avatarSignature: string;
  bannerHash: string;
  bannerSignature: string;
  socialAccounts: SocialAccount[];
  profileID: string;
} & BaseEntity

export type Audio = {
  genre: number[];
  collectionID: string;
  owners: LoyaltyOwner[];
  releaseYear: string;
  audioID: string;
  duration: number;
  audioSignature: string;
  audioHash: string;
  fit: string[];
} & BaseEntity

export type Playlist = {
  playlistID: string;
  owners: LoyaltyOwner[];
  releaseYear: string;
  audios: Audio[];
  description: string;
  hash: string;
  meta: string;
} & BaseEntity

export interface Subscription {
  name: string;
  subscriptionID: string;
  creatorAddress: string;
  maxMembers: number;
  streams: string;
  price: string;
  consumable: string;
  members: { address: string }[]
}

export type CreateCommandParams = {
  name: string;
  nickName: string;
  description: string;
  socialAccounts: SocialAccount[];
  avatarHash: Buffer;
  avatarSignature: Buffer;
  bannerHash: Buffer;
  bannerSignature: Buffer;
} & BaseEntity

interface LockedBalance {
  amount: string,
  height: number;
}

export interface Balance {
  tokenID: string,
  availableBalance: string,
  lockedBalances: LockedBalance[]
}

export interface Auth {
  nonce: string,
  numberOfSignatures?: number,
  mandatoryKeys?: string[],
  optionalKeys?: string[]
}

export interface Account {
  address: string;
  auth: Auth;
  balances: Balance[];
}

export type EndpointParams = Partial<Record<
  'offset' | 'limit' | 'sort'
  | 'audioID' | 'collectionID' | 'profileID'
  | 'transactionID' | 'blockID' | 'subscriptionID'
  | 'creatorAddress' | 'address' | 'ownerAddress' | 'memberAddress',
string>>;

export interface MetaProps {
  total: number;
  offset: number;
  count: number;
}

export interface EndpointResult<T> {
  data: T;
  meta: MetaProps;
}

export type AwaitedEndpointResult<T> = Promise<EndpointResult<T>>;

export interface NetworkStatus {
  data: {
    networkVersion: string;
    chainID: string;
    height: number;
    finalizedHeight: number;
  },
  meta: {
    lastUpdate: number;
    lastBlockHeight: number;
    lastBlockID: string;
  }
}

export interface KeyValue { [key: string]: any }
