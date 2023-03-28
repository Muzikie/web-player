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

export interface Collection extends BaseEntity {
  collectionType: CollectionType;
  audios: string[];
  releaseYear: string;
  collectionID: string;
  coverSignature: string;
  coverHash: string;
}

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

export interface Profile extends BaseEntity {
  name: string;
  nickName: string;
  description: string;
  avatarHash: string;
  avatarSignature: string;
  bannerHash: string;
  bannerSignature: string;
  socialAccounts: SocialAccount[];
  profileID: string;
}

export interface Audio extends BaseEntity {
  genre: number[];
  collectionID: string;
  owners: LoyaltyOwner[];
  releaseYear: string;
  audioID: string;
  duration: number;
  audioSignature: string;
  audioHash: string;
  fit: string[];
}

export interface Playlist extends BaseEntity {
  playlistID: string;
  owners: LoyaltyOwner[];
  releaseYear: string;
  audios: Audio[];
  description: string;
  hash: string;
  meta: string;
}

export interface CreateCommandParams extends BaseEntity {
  name: string;
  nickName: string;
  description: string;
  socialAccounts: SocialAccount[];
  avatarHash: Buffer;
  avatarSignature: Buffer;
  bannerHash: Buffer;
  bannerSignature: Buffer;
}
