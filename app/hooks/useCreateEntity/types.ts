import {
  Audio,
  Collection,
  CreateCommandParams,
  MODULES,
  COMMANDS,
} from '~/configs';
import { ProfileInfoType } from '~/context/profileContext/types';

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

export interface ProfileTxProps extends Omit<CreateCommandParams, 'name' |'creatorAddress' | 'avatarHash' | 'avatarSignature' | 'bannerHash' | 'bannerSignature'> {
  uploadAvatar: FileList | null;
  uploadBanner: FileList | null;
}

export type validateProps = AudioTxProps | CollectionTxProps | ProfileTxProps;

export type EntityName = 'audio' | 'collection' | 'profile';

export interface signTransactionProps {
  command: COMMANDS,
  module: MODULES,
  params: any,
  files: { value: File, key: string }[],
  account: ProfileInfoType,
}
