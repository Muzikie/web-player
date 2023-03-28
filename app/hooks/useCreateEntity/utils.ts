import { transactions, cryptography } from '@liskhq/lisk-client';
import md5 from 'md5';

import { bufferize } from '~/helpers/convertors';
import {
  SCHEMAS,
  CHAIN_ID,
} from '~/configs';
import { SignTransactionProps, SignTransactionResult } from './types';

export const signTransaction = async ({
  command, module, params, files, account,
}: SignTransactionProps): Promise<SignTransactionResult|Error> => {
  const schema = SCHEMAS[`${module}/${command}`];
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

  // Create blockchain transaction and broadcast it
  const tx = {
    module,
    command,
    nonce: BigInt(account.nonce),
    senderPublicKey: bufferize(account.publicKey),
    params: {
      ...params,
      ...fileSignatures,
    },
  };
  const fee = transactions.computeMinFee(tx, schema);
  // Sign the transaction
  const signedTx = transactions.signTransactionWithPrivateKey(
    { ...tx, fee },
    bufferize(CHAIN_ID),
    bufferize(account.privateKey),
    schema
  );
  if (!schema || !signedTx.id || !Buffer.isBuffer(signedTx.id)) {
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
