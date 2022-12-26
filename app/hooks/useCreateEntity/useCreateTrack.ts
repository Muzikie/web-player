import React, { useState, ChangeEvent } from 'react';
import { transactions, cryptography } from '@liskhq/lisk-client';

import { useAccount } from '~/hooks/useAccount/useAccount';
import { MODULES, COMMANDS } from './constants';
import { AUDIO_CREATE_SCHEMA } from '~/constants/schemas';

export const useCreateTrack = () => {
  const { updateAccount } = useAccount();

  const [name, setName] = useState<string>('');
  const [releaseYear, setReleaseYear] = useState<string>('');
  const [artistName, setArtistName] = useState<string>('');
  const [collectionID, setCollectionID] = useState<string>('');
  const [genre, setGenre] = useState<number>(0);
  const [file, setFile] = useState<File | null>(null);

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
    const txObject = {
      module: MODULES.TOKEN,
      command: COMMANDS.CREATE,
      nonce: BigInt(data.nonce),
      fee: BigInt('10000000'), // @todo calculate fee dynamically
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
    // Sign the transaction
    const signedTx = transactions.signTransactionWithPrivateKey(
      txObject,
      Buffer.from('00000000', 'hex'),
      Buffer.from(data.privateKey, 'hex'),
      AUDIO_CREATE_SCHEMA
    );
    console.log('signedTx', signedTx);
    // dry-run transaction to get the transaction ID
    // broadcast transaction
    // Check if the NFT is created correctly
    // If successful, make an API call to the server to save the entity
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
  };
};
