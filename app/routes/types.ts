import type { SearchResultType } from '~/models/types';

import {
  Collection,
  Audio,
  Profile,
  Playlist,
  Subscription,
} from '~/configs';

export interface SearchLoaderData {
  result: Awaited<SearchResultType[]>;
}

export interface CollectionInfoLoaderData {
  CollectionInfo: Awaited<Collection[]>;
  address: string;
}

export interface CollectionLoaderData {
  collection: Awaited<Collection>;
  profile: Awaited<Profile>;
  audios: Awaited<Audio[]>;
  id: string;
}

export interface ListScreenProps {
  request: Request;
  params: {
    id: string;
  };
}

export interface collectionLoaderProps {
  request: Request;
  params: {
    id: string;
  };
}

export interface HomeLoaderData {
  trending: Awaited<Audio[]>;
  profiles: Awaited<Profile[]>;
  collections: Awaited<Collection[]>;
}

export interface LoaderBaseProps {
  request: Request;
}

export interface PlaylistLoaderData {
  playlist: Awaited<Playlist>;
  audios: Awaited<Audio[]>;
  id: number;
}

export interface playlistLoaderParams {
  params: {
    id: number;
  };
}

export interface ProfileLoaderData {
  profile: Awaited<Profile>;
  collections?: Awaited<Collection[]>;
  audios?: Awaited<Audio[]>;
  id: string;
}

export interface profileLoaderProps {
  params: {
    id: string;
  };
}

export interface UploadLoaderProps {
  request: Request;
}

export interface UploadLoaderData {
  id: string;
}

export interface DiscographyLoaderData {
  collections: Awaited<Collection[]>;
  audios: Awaited<Audio[]>;
}

export interface DiscographyProps {
  audios: Audio[];
  collections: Collection[];
}

export interface PurchaseSubscriptionData {
  subscriptionPlans: Awaited<Subscription[]>;
}

export interface ActiveSubscriptionData {
  activeSubscription: Awaited<Subscription|null>;
}

export interface MainLoaderData {
  passphrase: string;
}
