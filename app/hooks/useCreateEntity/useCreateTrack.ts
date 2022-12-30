import { useState, ChangeEvent } from 'react';
import { transactions, cryptography } from '@liskhq/lisk-client';

import { useAccount } from '~/hooks/useAccount/useAccount';
import { MODULES, COMMANDS, FEEDBACK_MESSAGES } from './constants';
import { AUDIO_CREATE_SCHEMA } from '~/constants/schemas';
import { CHAIN_ID } from '~/constants/app';
import { Method } from '~/context/socketContext/types';
import { useWS } from '../useWS/useWS';

export const useCreateTrack = () => {
  const { updateAccount } = useAccount();
  const { request } = useWS();

  const [name, setName] = useState<string>('');
  const [releaseYear, setReleaseYear] = useState<string>('');
  const [artistName, setArtistName] = useState<string>('');
  const [collectionID, setCollectionID] = useState<string>('');
  const [genre, setGenre] = useState<number>(-1);
  const [file, setFile] = useState<File | null>(null);
  const [feedback, setFeedback] = useState<{ message: string; error: boolean }>({ message: '', error: false });

  const onChange = (e: ChangeEvent<HTMLInputElement|HTMLSelectElement>) => {
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
    case 'file':
      setFile(e.target.files?.[0] ?? null);
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
    const dryRunResponse = await request(
      Method.txpool_dryRunTransaction,
      { transaction: txBytes.toString('hex') },
    );
    // broadcast transaction
    if (dryRunResponse.data?.success) {
      const response = await request(
        Method.txpool_postTransaction,
        { transaction: txBytes.toString('hex') },
      );
      // Check if the NFT is created correctly
      if (response.data.transactionId) {
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

  return {
    name,
    releaseYear,
    artistName,
    file,
    genre,
    collectionID,
    onChange,
    broadcast,
    feedback,
  };
};
