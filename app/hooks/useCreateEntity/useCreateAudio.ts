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
import {
  DryRunTxResponse,
  PostTxResponse,
  Method,
} from '~/context/socketContext/types';
import { useWS } from '../useWS/useWS';
import { ValidationStatus } from './types';
import { validate } from './validator';
import { postTransaction } from '~/models/entity.client';
import { getTransactionExecutionStatus } from '~/helpers/transaction';
import { bufferize } from '~/helpers/convertors';

export const useCreateAudio = () => {
  const { updateAccount } = useAccount();
  const { request } = useWS();

  const [status, setStatus] = useState<ValidationStatus>(ValidationStatus.clean);
  const [name, setName] = useState<string>('');
  const [releaseYear, setReleaseYear] = useState<string>('');
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

    // Get file hash
    const fileContent = await files[0].arrayBuffer();
    const md5Hash = md5(new Uint8Array(fileContent)); // Takes around 0.001 ms
    const { signature } = cryptography.ed.signMessageWithPrivateKey(
      md5Hash, bufferize(data.privateKey),
    ); // Takes around 350 ms

    // Create blockchain transaction and broadcast it
    const tx = {
      module: MODULES.AUDIO,
      command: COMMANDS.CREATE,
      nonce: BigInt(data.nonce),
      senderPublicKey: bufferize(data.publicKey),
      params: {
        name,
        releaseYear,
        fit: [],
        audioSignature: signature,
        audioHash: bufferize(md5Hash),
        genre: [genre],
        collectionID: bufferize(collectionID),
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
      bufferize(CHAIN_ID),
      bufferize(data.privateKey),
      AUDIO_CREATE_SCHEMA
    );
    if (!signedTx.id || !Buffer.isBuffer(signedTx.id)) {
      return {
        txBytes: '',
        txId: '',
      }
    }
    const txId = signedTx.id.toString('hex');
    const txBytes = transactions.getBytes(signedTx, AUDIO_CREATE_SCHEMA);
    // dry-run transaction to get the errors
    const dryRunResponse = <DryRunTxResponse> await request(
      Method.txpool_dryRunTransaction,
      { transaction: txBytes.toString('hex') },
    );
    // broadcast transaction
    const txStatus = getTransactionExecutionStatus(MODULES.AUDIO, txId, dryRunResponse);
    if (txStatus === HTTP_STATUS.OK.CODE) {
      const postResponse = await postTransaction({
        transactionID: txId,
        creatorAddress: data.address,
        module: MODULES.AUDIO,
        command: COMMANDS.CREATE,
        audioHash: md5Hash,
        audioSignature: signature,
      }, files[0], 'audio');

      // Tell Streamer about it
      if (postResponse?._id) {
        const response = <PostTxResponse> await request(
          Method.txpool_postTransaction,
          { transaction: txBytes.toString('hex') },
        );

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
    validate('audio', {
      name,
      releaseYear,
      fit: [],
      files,
      genre: [genre],
      collectionID,
    }).then((result: ValidationStatus) => {
      setStatus(result);
    });
  }, [
    name,
    releaseYear,
    files,
    genre,
    collectionID,
  ]);

  return {
    name,
    releaseYear,
    files,
    genre,
    collectionID,
    status,
    onChange,
    broadcast,
    feedback,
  };
};
