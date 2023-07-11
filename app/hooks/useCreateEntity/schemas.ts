import * as yup from 'yup';
import { VALID_GENRES } from '~/configs';

export const audioSchema = yup
  .object()
  .shape({
    name: yup.string().trim().min(3, 'Name is too short').max(20, 'Name is too long'),
    releaseYear: yup.string().trim().matches(/(\d+){4}/, 'Please enter the release year in YYYY format'),
    profileName: yup.string().trim().matches(/([\w.\-\s]+){3,20}/, 'Please enter your profileName and it should be more than 3 characters'),
    files: yup.mixed().test({
      name: 'files',
      test: item => !!item?.[0]?.name,
    }),
    genre: yup.number().min(0).max(VALID_GENRES.length - 1).min(0).max(2).required('Please select a genre'),
    collectionID: yup.string().trim().matches(/([\w\d]+){10,}/, 'Please select a collection type'),
  });

export const collectionSchema = yup
  .object()
  .shape({
    name: yup.string().trim().min(3, 'Name is too short').max(20, 'Name is too long'),
    releaseYear: yup.string().trim().matches(/(\d+){4}/, 'Please enter the release year in YYYY format'),
    profileName: yup.string().trim().matches(/([\w.\-\s]+){3,20}/, 'Please enter your profileName and it should be more than 3 characters'),
    collectionType: yup.number().min(1, 'Please select a collection type').max(2),
    files: yup.mixed().test({
      message: 'Please enter an image',
      name: 'files',
      test: item => !!item?.[0]?.name,
    }),
  });

export const profileSchema = yup
  .object()
  .shape({
    name: yup.string().trim().min(3, 'Name is too short').max(20, 'Name is too long'),
    nickName: yup.string().trim().min(3, 'NickName is too short').max(20, 'NickName is too long'),
    description: yup.string().trim().min(20, 'Description is too short').max(1400, 'Description is too long'),
    socialAccounts: yup.array().of(yup.object().shape({
      platform: yup.number().min(0).max(2),
      username: yup.string().trim().matches(/([\w.\-\s]+){3,20}/, 'fill all the required social account'),
    })),
    avatar: yup.mixed().test({
      message: 'Please enter a avatar image',
      name: 'files',
      test: (item) => {
        console.log('avatar yup', item);
        if (!item.length) return true;
        return !!item?.[0]?.type.includes('image');
      },
    }),
    banner: yup.mixed().test({
      message: 'Please enter a banner image',
      name: 'files',
      test: (item) => {
        console.log('banner yup', item);
        if (!item.length) return true;
        return !!item?.[0]?.type.includes('image');
      },
    }),
  });
  