/* External dependencies */
import { useState, ChangeEvent, useEffect } from 'react';
import { transactions, cryptography } from '@liskhq/lisk-client';
import md5 from 'md5';

/* Internal dependencies */
import { useAccount } from '~/hooks/useAccount/useAccount';
import {
  MODULES,
  COMMANDS,
  AUDIO_CREATE_SCHEMA,
  CHAIN_ID,
  HTTP_STATUS,
} from '~/configs';
import { waitFor } from '~/helpers/helpers';
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
import { postAudio } from '~/models/entity.client';
import { getTransactionExecutionStatus } from '~/helpers/transaction';
import { bufferize } from '~/helpers/convertors';

export const useCreateAudio = () => {
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
      md5Hash, bufferize(data.privateKey),
    ); // Takes around 350 ms
    console.log('md5Hash', md5Hash);
    console.log('signature', signature);

    // Create blockchain transaction and broadcast it
    const tx = {
      module: MODULES.AUDIO,
      command: COMMANDS.CREATE,
      nonce: BigInt(data.nonce),
      senderPublicKey: bufferize(data.publicKey),
      params: {
        name,
        releaseYear,
        artistName,
        hash: signature,
        meta: bufferize(md5Hash),
        genre: [genre],
        collectionID: bufferize(collectionID),
        owners: [{
          address: cryptography.address.getAddressFromLisk32Address(data.address),
          shares: 100
        }]
      },
    };
    console.log('tx', tx);
    const fee = transactions.computeMinFee(tx, AUDIO_CREATE_SCHEMA);
    console.log('fee', fee);
    // Sign the transaction
    const signedTx = transactions.signTransactionWithPrivateKey(
      { ...tx, fee },
      bufferize(CHAIN_ID),
      bufferize(data.privateKey),
      AUDIO_CREATE_SCHEMA
    );
    console.log('signedTx', signedTx);
    if (!signedTx.id || !Buffer.isBuffer(signedTx.id)) {
      return {
        txBytes: '',
        txId: '',
      }
    }
    const txId = signedTx.id.toString('hex');
    console.log('txId', txId);
    const txBytes = transactions.getBytes(signedTx, AUDIO_CREATE_SCHEMA);
    // dry-run transaction to get the errors
    const dryRunResponse = <DryRunTxResponse> await request(
      Method.txpool_dryRunTransaction,
      { transaction: txBytes.toString('hex') },
    );
    // broadcast transaction
    console.log('dryRunResponse', dryRunResponse);
    const txStatus = getTransactionExecutionStatus(MODULES.AUDIO, txId, dryRunResponse);
    console.log('txStatus', txStatus);
    if (txStatus === HTTP_STATUS.OK.CODE) {
      const response = <PostTxResponse> await request(
        Method.txpool_postTransaction,
        { transaction: txBytes.toString('hex') },
      );
      console.log('response', response);
      // Check if the NFT is created correctly
      if (!response.error) {
        setFeedback({ message: HTTP_STATUS.PENDING.MESSAGE, error: true });
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
            const postResponse = await postAudio({
              ...createdAudio.data,
              creatorAddress: cryptography.address.getLisk32AddressFromAddress(bufferize(createdAudio.data.creatorAddress)),
              audioID,
            }, files[0]);
            if (postResponse?.audioID === audioID) {
              setFeedback({ message: HTTP_STATUS.OK.MESSAGE, error: false });
            }
          }
        }
      } else {
        setFeedback({ message: HTTP_STATUS.BAD_REQUEST.MESSAGE, error: true });
      }
    } else {
      setFeedback({ message: HTTP_STATUS.NOT_SIGNED.MESSAGE, error: true });
    }
  };

  useEffect(() => {
    validate('audio', {
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
