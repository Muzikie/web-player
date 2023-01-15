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
  PENDING: 'Wait while audio is being create. (~10 seconds)',
};

export const AUDIO_CREATE_SCHEMA = {
  $id: 'audio/create',
  title: 'CreateAsset transaction asset for audio module',
  type: 'object',
  required: [
    'name',
    'releaseYear',
    'artistName',
    'genre',
    'collectionID',
    'owners',
  ],
  properties: {
    name: {
      dataType: 'string',
      fieldNumber: 1,
      minLength: 3,
      maxLength: 40,
    },
    releaseYear: {
      dataType: 'string',
      fieldNumber: 2,
    },
    artistName: {
      dataType: 'string',
      fieldNumber: 3,
      minLength: 3,
      maxLength: 40,
    },
    genre: {
      type: 'array',
      fieldNumber: 4,
      items: {
        dataType: 'uint32',
      },
    },
    collectionID: {
      dataType: 'bytes',
      fieldNumber: 5,
    },
    owners: {
      type: 'array',
      fieldNumber: 6,
      items: {
        $id: 'audio/create/owners',
        type: 'object',
        required: ['address', 'shares'],
        properties: {
          address: {
            dataType: 'bytes',
            format: 'lisk32',
            fieldNumber: 1,
          },
          shares: {
            dataType: 'uint32',
            fieldNumber: 2,
          },
        },
      },
    },
    hash: {
      dataType: 'bytes',
      fieldNumber: 7,
    },
    meta: {
      dataType: 'bytes',
      fieldNumber: 8,
    },
  },
};

export const COLLECTION_CREATE_SCHEMA = {
  $id: 'collection/create',
  title: 'CreateAsset transaction asset for collection module',
  type: 'object',
  required: ['name', 'releaseYear', 'artistName', 'coArtists', 'collectionType'],
  properties: {
    name: {
      dataType: 'string',
      fieldNumber: 1,
      minLength: 3,
      maxLength: 40,
    },
    releaseYear: {
      dataType: 'string',
      fieldNumber: 2,
    },
    artistName: {
      dataType: 'string',
      fieldNumber: 3,
      minLength: 3,
      maxLength: 40,
    },
    coArtists: {
      type: 'array',
      fieldNumber: 4,
      items: {
        dataType: 'string',
      },
    },
    collectionType: {
      dataType: 'uint32',
      fieldNumber: 5,
    },
    hash: {
      dataType: 'bytes',
      fieldNumber: 6,
    },
    meta: {
      dataType: 'bytes',
      fieldNumber: 7,
    },
  },
};

export const SUBSCRIPTION_PURCHASE_SCHEMA = {
  $id: 'subscription/purchase',
  title: 'PurchaseAsset transaction asset for subscription module',
  type: 'object',
  required: ['subscriptionID', 'members'],
  properties: {
    subscriptionID: {
      dataType: 'bytes',
      fieldNumber: 1,
    },
    members: {
      type: 'array',
      fieldNumber: 2,
      items: {
        dataType: 'bytes',
        format: 'lisk32',
      },
    },
  },
};

