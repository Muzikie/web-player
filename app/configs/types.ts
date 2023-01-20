interface BaseEntity {
  creatorAddress: string;
  name: string;
}

interface LoyaltyOwner {
  address: string;
  shares: number;
  income: string;
}

export interface Collection extends BaseEntity {
  coArtists: string[];
  collectionType: number;
  audios: string[];
  releaseYear: string;
  artistName: string;
  collectionID: string;
  hash: string;
  meta: string;
}

export enum SocialAccountPlatform {
  Instagram = 0,
  Twitter = 1,
  Youtube = 2,
}

interface SocialAccount {
  username: string;
  platform: SocialAccountPlatform;
}

export interface Artist extends BaseEntity {
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
  artistName: string;
  audioID: string;
  duration: number;
  hash: string;
  meta: string;
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
