export const AUDIO_CREATE_SCHEMA = {
  $id: 'audio/create',
  title: 'CreateAsset transaction asset for audio module',
  type: 'object',
  required: [
    'name',
    'releaseYear',
    'genre',
    'collectionID',
    'owners',
    'audioSignature',
    'audioHash',
    'fit',
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
    genre: {
      type: 'array',
      fieldNumber: 3,
      items: {
        dataType: 'uint32',
      },
    },
    collectionID: {
      dataType: 'bytes',
      fieldNumber: 4,
    },
    owners: {
      type: 'array',
      fieldNumber: 5,
      items: {
        $id: 'audio/create/owners',
        type: 'object',
        required: ['address', 'shares'],
        properties: {
          address: {
            dataType: 'bytes',
            fieldNumber: 1,
          },
          shares: {
            dataType: 'uint32',
            fieldNumber: 2,
          },
        },
      },
    },
    audioSignature: {
      dataType: 'bytes',
      fieldNumber: 6,
    },
    audioHash: {
      dataType: 'bytes',
      fieldNumber: 7,
    },
    fit: {
      type: 'array',
      fieldNumber: 8,
      items: {
        dataType: 'bytes',
        format: 'lisk32',
      },
    },
  },
};

export const AUDIO_STREAM_SCHEMA = {
  $id: 'audio/stream',
  title: 'StreamAsset transaction asset for audio module',
  type: 'object',
  required: ['audioID'],
  properties: {
    audioID: {
      dataType: 'bytes',
      fieldNumber: 1,
    },
  },
};

export const COLLECTION_CREATE_SCHEMA = {
  $id: 'collection/create',
  title: 'CreateAsset transaction asset for collection module',
  type: 'object',
  required: ['name', 'releaseYear', 'collectionType', 'coverSignature', 'coverHash'],
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
    collectionType: {
      dataType: 'uint32',
      fieldNumber: 3,
    },
    coverSignature: {
      dataType: 'bytes',
      fieldNumber: 4,
    },
    coverHash: {
      dataType: 'bytes',
      fieldNumber: 5,
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
