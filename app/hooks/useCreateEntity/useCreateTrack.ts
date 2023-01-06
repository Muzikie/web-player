/* External dependencies */
import { useState, ChangeEvent, useEffect } from 'react';
import { transactions, cryptography } from '@liskhq/lisk-client';

/* Internal dependencies */
import { useAccount } from '~/hooks/useAccount/useAccount';
import { MODULES, COMMANDS, FEEDBACK_MESSAGES } from './constants';
import { AUDIO_CREATE_SCHEMA } from '~/constants/schemas';
import { CHAIN_ID } from '~/constants/app';
import { Method, DryRunTxResponse, PostTxResponse } from '~/context/socketContext/types';
import { useWS } from '../useWS/useWS';
import { ValidationStatus } from './types';
import { validate } from './validator';

export const useCreateTrack = () => {
  const { updateAccount } = useAccount();
  const { request } = useWS();

  const [status, setStatus] = useState<ValidationStatus>(ValidationStatus.clean);
  const [name, setName] = useState<string>('');
  const [releaseYear, setReleaseYear] = useState<string>('');
  const [artistName, setArtistName] = useState<string>('');
  const [collectionID, setCollectionID] = useState<string>('');
  const [genre, setGenre] = useState<number>(-1);
  const [files, setFiles] = useState<FileList | null>(null);
  const [feedback, setFeedback] = useState<{ message: string; error: boolean }>({ message: '', error: false });

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    switch (e.target.name) {
    case 'name':
      setName(e.target.value);
      break;
    case 'releaseYear':
      setReleaseYear(e.target.value);
      break;
    case 'artistName':
      setArtistName(e.target.value);
      break;
    case 'collectionID':
      setCollectionID(e.target.value);
      break;
    case 'files':
      setFiles(e.target.files ?? null);
      break;
    case 'genre':
      setGenre(Number(e.target.value));
      break;
    default:
      break;
    }
  };

  const broadcast = async () => {
    // update account state
    const data = await updateAccount();
    // Create blockchain transaction and broadcast it
    const tx = {
      module: MODULES.AUDIO,
      command: COMMANDS.CREATE,
      nonce: BigInt(data.nonce),
      senderPublicKey: Buffer.from(data.publicKey, 'hex'),
      params: {
        name,
        releaseYear,
        artistName,
        genre: [genre],
        collectionID: Buffer.from(collectionID, 'hex'),
        owners: [{
          address: cryptography.address.getAddressFromLisk32Address(data.address),
          shares: 100
        }]
      },
    };
    const fee = transactions.computeMinFee(tx, AUDIO_CREATE_SCHEMA);
    // Sign the transaction
    const signedTx = transactions.signTransactionWithPrivateKey(
      { ...tx, fee },
      Buffer.from(CHAIN_ID, 'hex'),
      Buffer.from(data.privateKey, 'hex'),
      AUDIO_CREATE_SCHEMA
    );
    const txBytes = transactions.getBytes(signedTx, AUDIO_CREATE_SCHEMA);
    // dry-run transaction to get the errors
    const dryRunResponse = <DryRunTxResponse> await request(
      Method.txpool_dryRunTransaction,
      { transaction: txBytes.toString('hex') },
    );
    // broadcast transaction
    if (!dryRunResponse.error) {
      const response = <PostTxResponse> await request(
        Method.txpool_postTransaction,
        { transaction: txBytes.toString('hex') },
      );
      // Check if the NFT is created correctly
      if (!response.error) {
        setFeedback({ message: FEEDBACK_MESSAGES.SUCCESS, error: false });
        // @todo If successful, make an API call to the server to save the entity
      } else {
        setFeedback({ message: FEEDBACK_MESSAGES.BROADCAST_ERROR, error: true });
      }
    } else {
      setFeedback({ message: FEEDBACK_MESSAGES.INVALID_PARAMS, error: true });
      // Set errors and display to user
    }
  };

  useEffect(() => {
    validate('track', {
      name,
      releaseYear,
      artistName,
      files,
      genre: [genre],
      collectionID,
    }).then((result: ValidationStatus) => {
      setStatus(result);
    });
  }, [
    name,
    releaseYear,
    artistName,
    files,
    genre,
    collectionID,
  ]);

  return {
    name,
    releaseYear,
    artistName,
    files,
    genre,
    collectionID,
    status,
    onChange,
    broadcast,
    feedback,
  };
};
