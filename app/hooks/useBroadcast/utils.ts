import { transactions, cryptography } from '@liskhq/lisk-client';
import md5 from 'md5';

import { bufferize } from '~/helpers/convertors';
import {
  SCHEMAS,
  CHAIN_ID,
  Account,
} from '~/configs';
import { SignTransactionProps, SignTransactionResult } from '../useCreateEntity/types';

export const getFileSignatures = async (files: { value: File, key: string }[], account: Account): Promise<{ [key: string]: Buffer }> => {
  const fileSignatures: { [key: string]: Buffer } = {};
  for await (const file of files) {
    const fileContent = await file.value.arrayBuffer();
    const md5Hash = md5(new Uint8Array(fileContent)); // Takes around 0.001 ms
    const { signature } = cryptography.ed.signMessageWithPrivateKey(
      md5Hash, bufferize(account.privateKey),
    ); // Takes around 350 ms
    fileSignatures[`${file.key}Hash`] = bufferize(md5Hash);
    fileSignatures[`${file.key}Signature`] = signature;
  }

  return fileSignatures;
};

export const signTransaction = async ({
  command, module, params, account,
}: SignTransactionProps): Promise<SignTransactionResult|Error> => {
  const schema = SCHEMAS[`${module}/${command}`];
  if (!schema) {
    return new Error('Could not find the corresponding schema');
  }

  // Create blockchain transaction and broadcast it
  const tx = {
    module,
    command,
    nonce: BigInt(account.auth.nonce),
    senderPublicKey: bufferize(account.publicKey),
    params,
  };
  const fee = transactions.computeMinFee(tx, schema);
  // Sign the transaction
  const signedTx = transactions.signTransactionWithPrivateKey(
    { ...tx, fee },
    bufferize(CHAIN_ID),
    bufferize(account.privateKey),
    schema
  );
  // @todo improve the transaction signature validation
  // meaning, check if there is an array called signatures
  // which includes a valid signature (buffer of length 64)
  if (!signedTx.id || !Buffer.isBuffer(signedTx.id)) {
    return new Error('Error while signing transaction');
  }

  const txId = signedTx.id.toString('hex');
  const txBytes = transactions.getBytes(signedTx, schema);

  return {
    transaction: signedTx,
    txId,
    txBytes
  };
};
