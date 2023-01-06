import * as yup from 'yup';
import { VALID_GENRES } from '~/constants/app';

export const trackSchema = yup
  .object()
  .shape({
    name: yup.string().trim().matches(/([\w\.\-\s]+){3,20}/),
    releaseYear: yup.string().trim().matches(/(\d+){4}/),
    artistName: yup.string().trim().matches(/([\w\.\-\s]+){3,20}/),
    files: yup.mixed().test({
      name: 'files',
      test: item => !!item?.[0]?.name,
    }),
    genre: yup.array().of(yup.number().min(0).max(VALID_GENRES.length - 1)).min(1).max(2),
    collectionID: yup.string().trim().matches(/([\w\d]+){10,}/),
  });


export const collectionSchema = yup
  .object()
  .shape({
    name: yup.string().trim().matches(/([\w\.\-\s]+){3,20}/),
    releaseYear: yup.string().trim().matches(/(\d+){4}/),
    artistName: yup.string().trim().matches(/([\w\.\-\s]+){3,20}/),
    collectionType: yup.number().min(1).max(2),
    files: yup.mixed().test({
      name: 'files',
      test: item => !!item?.[0]?.name,
    }),
  });


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
  