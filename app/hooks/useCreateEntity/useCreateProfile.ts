/* External dependencies */
import { useState, ChangeEvent, useEffect } from 'react';
import { transactions, cryptography } from '@liskhq/lisk-client';
import md5 from 'md5';

/* Internal dependencies */
import { useAccount } from '~/hooks/useAccount/useAccount';
import {
  MODULES,
  COMMANDS,
  CHAIN_ID,
  HTTP_STATUS,
  PROFILE_CREATE_SCHEMA,
  SocialAccountPlatform,
  SocialAccount,
} from '~/configs';
import { DryRunTxResponse, Method } from '~/context/socketContext/types';
import { useWS } from '../useWS/useWS';
import { ValidationStatus } from './types';
import { validate } from './validator';
import { postTransaction } from '~/models/entity.client';
import { getTransactionExecutionStatus } from '~/helpers/transaction';
import { bufferize } from '~/helpers/convertors';

export const useCreateCollection = () => {
  const { updateAccount } = useAccount();
  const { request } = useWS();

  const platforms = Object.keys(SocialAccountPlatform);
  const initialValue = [
    { platform: SocialAccountPlatform.Twitter, username: '' },
    { platform: SocialAccountPlatform.Instagram, username: '' },
    { platform: SocialAccountPlatform.Youtube, username: '' },
  ];

  const [status, setStatus] = useState<ValidationStatus>(ValidationStatus.clean);
  const [nickName, setNickName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [socialAccounts, setSocialAccounts] = useState<SocialAccount[]>(initialValue);
  const [uploadBanner, setUploadBanner] = useState<FileList | null>();
  const [uploadAvatar, setUploadAvatar] = useState<FileList | null>(null);
  const [feedback, setFeedback] = useState<{ message: string; error: boolean }>({
    message: '',
    error: false,
  });

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    switch (e.target.name) {
    case 'nickName':
      setNickName(e.target.value);
      break;
    case 'description':
      setDescription(e.target.value);
      break;
    case 'uploadBanner':
      setUploadBanner(e.target.files ?? null);
      break;
    case 'uploadAvatar':
      setUploadAvatar(e.target.files ?? null);
      break;
    case 'youtube':
      setSocialAccounts(
        socialAccounts.map(({ platform, username }) => {
          if (platforms[platform] === e.target.name)
            return { platform, username: e.target.value };
          return { platform, username };
        }),
      );
      break;
    case 'instagram':
      setSocialAccounts(
        socialAccounts.map(({ platform, username }) => {
          if (platforms[platform] === e.target.name)
            return { platform, username: e.target.value };
          return { platform, username };
        }),
      );
      break;
    case 'twitter':
      setSocialAccounts(
        socialAccounts.map(({ platform, username }) => {
          if (platforms[platform] === e.target.name)
            return { platform, username: e.target.value };
          return { platform, username };
        }),
      );
      break;
    default:
      break;
    }
  };

  const broadcast = async () => {
    if (!uploadAvatar) {
      return false;
    }

    // update account state
    const data = await updateAccount();

    const bannerFile = await uploadAvatar[0].arrayBuffer();
    const md5Hash = md5(new Uint8Array(bannerFile)); // Takes around 0.001 ms
    const { signature } = cryptography.ed.signMessageWithPrivateKey(
      md5Hash,
      bufferize(data.privateKey),
    ); // Takes around 350 ms

    // Create blockchain transaction and broadcast it
    const tx = {
      module: MODULES.PROFILE,
      command: COMMANDS.CREATE,
      nonce: BigInt(data.nonce),
      senderPublicKey: bufferize(data.publicKey),
      params: {
        nickName,
        description,
        socialAccounts,
        avatarHash: bufferize(md5Hash),
        avatarSignature: signature,
        // bannerHash,
        // bannerSignature,
      },
    };
    const fee = transactions.computeMinFee(tx, PROFILE_CREATE_SCHEMA);
    // Sign the transaction
    const signedTx = transactions.signTransactionWithPrivateKey(
      { ...tx, fee },
      bufferize(CHAIN_ID),
      bufferize(data.privateKey),
      PROFILE_CREATE_SCHEMA,
    );
    if (!signedTx.id || !Buffer.isBuffer(signedTx.id)) {
      return {
        txBytes: '',
        txId: '',
      };
    }
    const txId = signedTx.id.toString('hex');
    const txBytes = transactions.getBytes(signedTx, PROFILE_CREATE_SCHEMA);
    // dry-run transaction to get the errors
    const dryRunResponse = <DryRunTxResponse>(
      await request(Method.txpool_dryRunTransaction, { transaction: txBytes.toString('hex') })
    );

    // broadcast transaction
    const txStatus = getTransactionExecutionStatus(MODULES.PROFILE, txId, dryRunResponse);
    if (txStatus === HTTP_STATUS.OK.CODE) {
      const postResponse = await postTransaction(
        {
          transactionID: txId,
          creatorAddress: data.address,
          module: MODULES.PROFILE,
          command: COMMANDS.CREATE,
          coverHash: md5Hash,
          coverSignature: signature,
        },
        uploadAvatar[0],
        'cover',
      );

      // Tell Streamer about it
      if (postResponse?._id) {
        const response = await request(Method.txpool_postTransaction, {
          transaction: txBytes.toString('hex'),
        });

        // Check if the NFT is created correctly
        if (!response.error) {
          setFeedback({ message: HTTP_STATUS.OK.MESSAGE, error: false });
        } else {
          setFeedback({ message: HTTP_STATUS.BAD_REQUEST.MESSAGE, error: true });
        }
      }
    } else {
      setFeedback({ message: HTTP_STATUS.NOT_SIGNED.MESSAGE, error: true });
    }
  };

  useEffect(() => {
    validate('profile', {
      nickName,
      description,
      socialAccounts,
      uploadAvatar,
    }).then((result: ValidationStatus) => {
      setStatus(result);
    });
  }, [nickName, description, socialAccounts, uploadAvatar]);

  return {
    nickName,
    description,
    socialAccounts,
    onChange,
    broadcast,
    feedback,
    status,
  };
};
