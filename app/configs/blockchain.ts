export enum MODULES {
  TOKEN = 'token',
  AUTH = 'auth',
  COLLECTION = 'collection',
  AUDIO = 'audio',
  SUBSCRIPTION = 'subscription',
  PLAYLIST = 'playlist',
  PROFILE = 'profile',
}

export enum COMMANDS {
  STREAM = 'stream',
  CREATE = 'create',
  PURCHASE = 'purchase',
  TRANSFORM = 'transform',
  DESTROY = 'destroy',
  SET_ATTRIBUTES = 'setAttributes',
  UPDATE_MEMBERS = 'updateMembers',
  RECLAIM = 'reclaim',
}

export const FILES = {
  [MODULES.AUDIO]: {
    primary: 'cover',
    secondary: 'audio',
  },
  [MODULES.COLLECTION]: {
    primary: 'cover',
  },
  [MODULES.PROFILE]: {
    primary: 'avatar',
    secondary: 'banner'
  },
  [MODULES.PLAYLIST]: {
    primary: 'cover',
  },
};
