export const MODULES = {
  TOKEN: 'token',
  AUTH: 'auth',
  COLLECTION: 'collection',
  AUDIO: 'audio',
  SUBSCRIPTION: 'subscription',
  PLAYLIST: 'playlist',
};

export const COMMANDS = {
  STREAM: 'stream',
  CREATE: 'create',
  PURCHASE: 'purchase',
  TRANSFORM: 'transform',
  DESTROY: 'destroy',
  SET_ATTRIBUTES: 'setAttributes',
  UPDATE_MEMBERS: 'updateMembers',
};

export const FILES = {
  [MODULES.AUDIO]: 'audio',
  [MODULES.COLLECTION]: 'cover',
  artist: 'avatar',
  [MODULES.PLAYLIST]: 'cover',
};

