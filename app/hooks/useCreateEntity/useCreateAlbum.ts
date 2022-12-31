import { useState, ChangeEvent } from 'react';
import { transactions } from '@liskhq/lisk-client';

import { useAccount } from '~/hooks/useAccount/useAccount';
import { MODULES, COMMANDS, FEEDBACK_MESSAGES } from './constants';
import { COLLECTION_CREATE_SCHEMA } from '~/constants/schemas';
import { CHAIN_ID } from '~/constants/app';
import { Method } from '~/context/socketContext/types';
import { useWS } from '../useWS/useWS';

export const useCreateAlbum = () => {
  const { updateAccount } = useAccount();
  const { request } = useWS();

  const [name, setName] = useState<string>('');
  const [releaseYear, setReleaseYear] = useState<string>('');
  const [artistName, setArtistName] = useState<string>('');
  const [collectionType, setCollectionType] = useState<number>(-1);
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
    case 'collectionType':
      setCollectionType(Number(e.target.value));
      break;
    case 'file':
      setFile(e.target.files?.[0] ?? null);
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
      module: MODULES.COLLECTION,
      command: COMMANDS.CREATE,
      nonce: BigInt(data.nonce),
      senderPublicKey: Buffer.from(data.publicKey, 'hex'),
      params: {
        name,
        releaseYear,
        artistName,
        coArtists: [],
        collectionType,
      },
    };
    const fee = transactions.computeMinFee(tx, COLLECTION_CREATE_SCHEMA);
    // Sign the transaction
    const signedTx = transactions.signTransactionWithPrivateKey(
      { ...tx, fee },
      Buffer.from(CHAIN_ID, 'hex'),
      Buffer.from(data.privateKey, 'hex'),
      COLLECTION_CREATE_SCHEMA
    );
    const txBytes = transactions.getBytes(signedTx, COLLECTION_CREATE_SCHEMA);
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
    collectionType,
    onChange,
    broadcast,
    feedback,
  };
};
