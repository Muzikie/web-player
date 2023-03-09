import { Audio, Collection, CreateCommandParams } from '~/configs';

export enum ValidationStatus {
  pending = 'PENDING',
  clean = 'CLEAN',
  invalid = 'INVALID',
  valid = 'VALID',
}

export interface AudioTxProps extends Omit<Audio, 'owners' | 'audioID' | 'duration' | 'creatorAddress' | 'audioSignature' | 'audioHash'> {
  files: FileList | null;
}

export interface CollectionTxProps extends Omit<Collection, 'creatorAddress' | 'collectionID' | 'audios' | 'coverSignature' | 'coverHash'> {
  files: FileList | null;
}

export interface ProfileTxProps extends Omit<CreateCommandParams, 'nickName' | 'description' | 'duration' | 'socialAccounts' | 'avatarHash' | 'avatarSignature' | 'bannerHash' | 'bannerSignature'> {
  files: FileList | null;
}

export type validateProps = AudioTxProps | CollectionTxProps | ProfileTxProps;

export type EntityName = 'audio' | 'collection' | 'profile';
