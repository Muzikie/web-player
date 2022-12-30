export const MODULES = {
  TOKEN: 'token',
  AUTH: 'auth',
  COLLECTION: 'collection',
  AUDIO: 'audio',
  SUBSCRIPTION: 'subscription',
};

export const COMMANDS = {
  CREATE: 'create',
  PURCHASE: 'purchase',
  TRANSFORM: 'transform',
  DESTROY: 'destroy',
  SET_ATTRIBUTES: 'setAttributes',
  UPDATE_MEMBERS: 'updateMembers',
};

export const FEEDBACK_MESSAGES = {
  INVALID_PARAMS: 'Audio parameters were invalid. Please review the data.',
  BROADCAST_ERROR: 'Error creating audio. Try again.',
  SUCCESS: 'Audio created successfully',
};
