import type {
  Collection,
  Audio,
  Profile,
} from '~/configs';

interface JSON { [key: string]: any }

export interface Asset {
  key: string;
  value: File;
}

export interface PostOptions {
  headers?: JSON;
  mode?: RequestMode;
  credentials?: RequestCredentials;
  redirect?: RequestRedirect;
}

export interface SearchResultType {
  audio: Audio[];
  profile: Profile[];
  collection: Collection[];
}

export interface transactionCreationProps {
  transaction: string;
}
