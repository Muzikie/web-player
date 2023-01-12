/* External dependencies */
import { useState, ChangeEvent, useEffect } from 'react';
import { transactions, cryptography } from '@liskhq/lisk-client';
import md5 from 'md5';

/* Internal dependencies */
import { useAccount } from '~/hooks/useAccount/useAccount';
import {
  MODULES,
  COMMANDS,
  FEEDBACK_MESSAGES,
  AUDIO_CREATE_SCHEMA,
} from '../../constants/blockchain';
import { waitFor } from '~/helpers/helpers';
import { CHAIN_ID } from '~/constants/app';
import {
  AudioAccountResponse,
  AudioResponse,
  DryRunTxResponse,
  PostTxResponse,
  Method,
} from '~/context/socketContext/types';
import { useWS } from '../useWS/useWS';
import { ValidationStatus } from './types';
import { validate } from './validator';
import { postTrack } from '~/models/entity.client';

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
    if (!files) {
      return false;
    }
    // update account state
    const data = await updateAccount();

    const curr = <AudioAccountResponse> await request(
      Method.audio_getAccount,
      { address: data.address },
    );

    const audiosCount = !curr.error ? curr.data.audio?.audios.length : 0;

    // Get file hash
    const fileContent = await files[0].arrayBuffer();
    const md5Hash = md5(new Uint8Array(fileContent)); // Takes around 0.001 ms
    const { signature } = cryptography.ed.signMessageWithPrivateKey(
      md5Hash, Buffer.from(data.privateKey, 'hex'),
    ); // Takes around 350 ms

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
        hash: signature,
        meta: Buffer.from(md5Hash, 'hex'),
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
    if (!dryRunResponse.error && dryRunResponse.data.result > -1) {
      const response = <PostTxResponse> await request(
        Method.txpool_postTransaction,
        { transaction: txBytes.toString('hex') },
      );
      // Check if the NFT is created correctly
      if (!response.error) {
        setFeedback({ message: FEEDBACK_MESSAGES.PENDING, error: true });
        await waitFor(12);
        const nextState = <AudioAccountResponse> await request(
          Method.audio_getAccount,
          { address: data.address },
        );
        if (!nextState.error && nextState.data.audio.audios.length > audiosCount) {
          const audioID = nextState.data.audio.audios[nextState.data.audio.audios.length - 1];
          const createdAudio = <AudioResponse> await request(
            Method.audio_getAudio,
            { audioID },
          );
          // Call Streamer
          if (!createdAudio.error) {
            const postResponse = await postTrack({
              ...createdAudio.data,
              creatorAddress: cryptography.address.getLisk32AddressFromAddress(Buffer.from(createdAudio.data.creatorAddress, 'hex')),
              audioID,
            }, files[0]);
            if (postResponse?.audioID === audioID) {
              setFeedback({ message: FEEDBACK_MESSAGES.SUCCESS, error: false });
            }
          }
        }
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
