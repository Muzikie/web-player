import { Audio, Collection } from '~/configs';

export enum ValidationStatus {
  pending = 'PENDING',
  clean = 'CLEAN',
  invalid = 'INVALID',
  valid = 'VALID',
}

export interface AudioTxProps extends Omit<Audio, 'owners' | 'audioID' | 'duration' | 'creatorAddress' | 'hash' | 'meta'> {
  files: FileList | null;
}

export interface CollectionTxProps extends Omit<Collection, 'creatorAddress' | 'collectionID' | 'coArtists' | 'audios' | 'hash' | 'meta'> {
  files: FileList | null;
}

export type validateProps = AudioTxProps | CollectionTxProps;

export type EntityName = 'audio' | 'collection';
