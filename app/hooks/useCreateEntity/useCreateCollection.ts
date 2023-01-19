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
  COLLECTION_CREATE_SCHEMA
} from '~/constants/blockchain';
import { waitFor } from '~/helpers/helpers';
import { CHAIN_ID, TX_STATUS } from '~/constants/app';
import {
  CollectionAccountResponse,
  CollectionResponse,
  DryRunTxResponse,
  Method,
} from '~/context/socketContext/types';
import { useWS } from '../useWS/useWS';
import { ValidationStatus } from './types';
import { validate } from './validator';
import { postCollection } from '~/models/entity.client';
import { getTransactionExecutionStatus } from '~/helpers/transaction';

export const useCreateCollection = () => {
  const { updateAccount } = useAccount();
  const { request } = useWS();

  const [status, setStatus] = useState<ValidationStatus>(ValidationStatus.clean);
  const [name, setName] = useState<string>('');
  const [releaseYear, setReleaseYear] = useState<string>('');
  const [artistName, setArtistName] = useState<string>('');
  const [collectionType, setCollectionType] = useState<number>(-1);
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
    case 'collectionType':
      setCollectionType(Number(e.target.value));
      break;
    case 'files':
      setFiles(e.target.files ?? null);
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

    const curr = <CollectionAccountResponse> await request(
      Method.collection_getAccount,
      { address: data.address },
    );

    const collectionsCount = !curr.error ? curr.data.collection?.collections.length : 0;

    const fileContent = await files[0].arrayBuffer();
    const md5Hash = md5(new Uint8Array(fileContent)); // Takes around 0.001 ms
    const { signature } = cryptography.ed.signMessageWithPrivateKey(
      md5Hash, Buffer.from(data.privateKey, 'hex'),
    ); // Takes around 350 ms

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
        hash: signature,
        meta: Buffer.from(md5Hash, 'hex'),
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
    if (!signedTx.id || !Buffer.isBuffer(signedTx.id)) {
      return {
        txBytes: '',
        txId: '',
      }
    }
    const txId = signedTx.id.toString('hex');
    const txBytes = transactions.getBytes(signedTx, COLLECTION_CREATE_SCHEMA);
    // dry-run transaction to get the errors
    const dryRunResponse = <DryRunTxResponse> await request(
      Method.txpool_dryRunTransaction,
      { transaction: txBytes.toString('hex') },
    );
    // broadcast transaction
    const txStatus = getTransactionExecutionStatus(MODULES.COLLECTION, txId, dryRunResponse);
    if (txStatus === TX_STATUS.SUCCESS) {
      const response = await request(
        Method.txpool_postTransaction,
        { transaction: txBytes.toString('hex') },
      );
      // Check if the NFT is created correctly
      if (!response.error) {
        setFeedback({ message: FEEDBACK_MESSAGES.PENDING, error: true });
        await waitFor(12);
        const nextState = <CollectionAccountResponse> await request(
          Method.collection_getAccount,
          { address: data.address },
        );
        if (!nextState.error && nextState.data.collection.collections.length > collectionsCount) {
          const collectionID = nextState.data.collection.collections[nextState.data.collection.collections.length - 1];
          const createdCollection = <CollectionResponse> await request(
            Method.collection_getCollection,
            { collectionID },
          );
          // Call Streamer
          if (!createdCollection.error) {
            const postResponse = await postCollection({
              ...createdCollection.data,
              creatorAddress: cryptography.address.getLisk32AddressFromAddress(Buffer.from(createdCollection.data.creatorAddress, 'hex')),
              collectionID,
            }, files[0]);
            if (postResponse?.collectionID === collectionID) {
              setFeedback({ message: FEEDBACK_MESSAGES.SUCCESS, error: false });
            }
          }
        }
      } else {
        setFeedback({ message: FEEDBACK_MESSAGES.BROADCAST_ERROR, error: true });
      }
    } else {
      setFeedback({ message: FEEDBACK_MESSAGES.INVALID_PARAMS, error: true });
    }
  };

  useEffect(() => {
    validate('collection', {
      name,
      releaseYear,
      artistName,
      collectionType,
      files,
    }).then((result: ValidationStatus) => {
      setStatus(result);
    });
  }, [
    name,
    releaseYear,
    artistName,
    collectionType,
    files,
  ]);

  return {
    name,
    releaseYear,
    artistName,
    collectionType,
    onChange,
    broadcast,
    feedback,
    status,
  };
};
