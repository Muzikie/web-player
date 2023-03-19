import * as yup from 'yup';
import { VALID_GENRES } from '~/configs';

export const audioSchema = yup
  .object()
  .shape({
    name: yup.string().trim().matches(/([\w.\-\s]+){3,20}/),
    releaseYear: yup.string().trim().matches(/(\d+){4}/),
    profileName: yup.string().trim().matches(/([\w.\-\s]+){3,20}/),
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
    name: yup.string().trim().matches(/([\w.\-\s]+){3,20}/),
    releaseYear: yup.string().trim().matches(/(\d+){4}/),
    profileName: yup.string().trim().matches(/([\w.\-\s]+){3,20}/),
    collectionType: yup.number().min(1).max(2),
    files: yup.mixed().test({
      name: 'files',
      test: item => !!item?.[0]?.name,
    }),
  });

export const profileSchema = yup
  .object()
  .shape({
    nickName: yup.string().trim().matches(/([\w.\-\s]+){3,20}/),
    description: yup.string().trim().matches(/([\w.\-\s]+){20,1400}/),
    socialAccounts: yup.array().of(yup.object().shape({
      platform: yup.number().min(0).max(2),
      username: yup.string().trim().matches(/([\w.\-\s]+){3,20}/),
    })),
    avatar: yup.mixed().test({
      name: 'files',
      test: item => !!item?.[0]?.name,
    }),
    banner: yup.mixed().test({
      name: 'files',
      test: item => !!item?.[0]?.name,
    }),
  });
  