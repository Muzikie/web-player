import * as yup from 'yup';

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
    genre: yup.string().matches(/[\d]{1}/, 'Please select a genre'),
    collectionID: yup.string().trim().matches(/([\w\d]+){10,}/, 'Please select a collection'),
    owners: yup.array().of(yup.object().shape({
      address: yup.string().matches(/lsk[\w\d]{38}/, 'Address must be a valid Lisk wallet address'),
      shares: yup.number().min(1).max(100),
    })).test(
      'sum-of-percentage',
      'The sum of the shares must be 100',
      (items) => {
        const sum = items?.reduce((acc, item) => {
          return acc + (item?.shares ?? 0);
        }, 0) || 0;
    
        // Check if the sum of shares is 100
        if (sum !== 100) {
          return false;
        }
        return true;
      }
    ).test(
      'unique-addresses',
      'Owner addresses must be unique',
      (items) => {
        // Check if owner addresses are unique
        const addressSet = new Set();
        for (const item of items) {
          if (addressSet.has(item.address)) {
            return false;
          }
          addressSet.add(item.address);
        }
    
        return true;
      }
    ),
  });

export const collectionSchema = yup
  .object()
  .shape({
    name: yup.string().trim().min(3, 'Name is too short').max(20, 'Name is too long'),
    releaseYear: yup.string().trim().matches(/(\d+){4}/, 'Please enter the release year in YYYY format'),
    profileName: yup.string().trim().matches(/([\w.\-\s]+){3,20}/, 'Please enter your profileName and it should be more than 3 characters'),
    collectionType: yup.string().matches(/[\d]{1}/, 'Please select a collection type'),
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
        if (!item.length) return true;
        return !!item[0]?.type.includes('image');
      },
    }),
    banner: yup.mixed().test({
      message: 'Please enter a banner image',
      name: 'files',
      test: (item) => {
        if (!item.length) return true;
        return !!item[0]?.type.includes('image');
      },
    }),
  });
  