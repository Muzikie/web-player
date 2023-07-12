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

export type AudioTxProps = {
  files: FileList | null;
} & Omit<Audio, 'owners' | 'audioID' | 'duration' | 'creatorAddress' | 'audioSignature' | 'audioHash'>

export type CollectionTxProps = {
  files: FileList | null;
} & Omit<Collection, 'creatorAddress' | 'collectionID' | 'audios' | 'coverSignature' | 'coverHash'>

export type ProfileTxProps = {
  avatar: FileList | null;
  banner: FileList | null;
} & Omit<CreateCommandParams, 'creatorAddress' | 'avatarHash' | 'avatarSignature' | 'bannerHash' | 'bannerSignature'>

export type validateProps = AudioTxProps | CollectionTxProps | ProfileTxProps;

export type EntityName = 'audio' | 'collection' | 'profile';

type TransactionProp = 'id' | 'params' | 'module' | 'command' | 'signatures' | 'nonce' | 'fee' | 'senderPublicKey';

export interface Params { [key: string]: unknown }

export interface SignTransactionProps {
  command: COMMANDS,
  module: MODULES,
  params: Params,
  account: ProfileInfoType,
}

export interface BroadcastProps {
  command: COMMANDS,
  module: MODULES,
  params: Params,
  account: ProfileInfoType,
}

export interface SignTransactionResult {
  transaction: Record<TransactionProp, any>,
  txId: string,
  txBytes: Buffer;
}

export interface ValidationResult {
  status: ValidationStatus;
  message?: string;
}
