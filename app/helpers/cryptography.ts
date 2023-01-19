import { cryptography } from '@liskhq/lisk-client';

import { DERIVATION_PATH } from '~/configs';

export const validateCredentials = async (secret: string) => {
  const privateKey = await cryptography.ed.getPrivateKeyFromPhraseAndPath(secret, DERIVATION_PATH);
  const publicKey = cryptography.ed.getPublicKeyFromPrivateKey(privateKey);
  const address = cryptography.address.getLisk32AddressFromPublicKey(publicKey);

  return {
    address,
    publicKey,
    privateKey,
  }
};
