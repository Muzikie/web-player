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
  avatar: FileList | null;
  banner: FileList | null;
}

export type validateProps = AudioTxProps | CollectionTxProps | ProfileTxProps;

export type EntityName = 'audio' | 'collection' | 'profile';

type TransactionProp = 'id' | 'params' | 'module' | 'command' | 'signatures' | 'nonce' | 'fee' | 'senderPublicKey';

export interface SignTransactionProps {
  command: COMMANDS,
  module: MODULES,
  params: { [key: string]: unknown },
  files: { value: File, key: string }[],
  account: ProfileInfoType,
}

export interface SignTransactionResult {
  transaction: Record<TransactionProp, any>,
  txId: string,
  txBytes: Buffer;
}
