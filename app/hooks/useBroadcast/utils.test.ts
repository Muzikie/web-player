import { cryptography } from '@liskhq/lisk-client';
import { accountMock } from '../../../test/mocks/account';
import { Account, COMMANDS, MODULES, VALID_GENRES } from '~/configs';
import { bufferize } from '~/helpers/convertors';
import { signTransaction } from './utils';

describe('useBroadcast', () => {
  const account: Account = {
    ...accountMock,
    balances: [],
    auth: {
      nonce: '1',
    },
    subscription: undefined,
  };

  it.skip('should sign audio/create transaction given valid props', async () => {
    const name = 'Test Audio';
    const command = COMMANDS.CREATE;
    const module = MODULES.AUDIO;
    const params = {
      name,
      releaseYear: '1994',
      fit: [cryptography.address.getAddressFromLisk32Address(accountMock.address)],
      genre: [VALID_GENRES[0].value],
      collectionID: bufferize('ef2f53fca6966b5f5f6673f6ef3b0c17'),
      owners: [
        {
          address:  cryptography.address.getAddressFromLisk32Address(accountMock.address),
          shares: 100,
        },
      ],
    };

    const result = await signTransaction({ command, module, params, account });
 
    expect(result).toMatchObject({
      txId: expect.any(String),
      txBytes: expect.any(Buffer),
      transaction: expect.any(Object),
    });
  });

  it.skip('should sign audio/stream transaction given valid props', async () => {
    const command = COMMANDS.STREAM;
    const module = MODULES.AUDIO;
    const params = {
      audioID: bufferize('ef2f53fca6966b5f5f6673f6ef3b0c17'),
    };

    const result = await signTransaction({ command, module, params, account });
 
    expect(result).toMatchObject({
      txId: expect.any(String),
      txBytes: expect.any(Buffer),
      transaction: expect.any(Object),
    });
  });
});
  
// describe('Valid transactions', () => {
// it.todo('should return error if transaction does not match the schema');
//   // signature is a buffer of length 64. check if all expected values are returned
//   it.todo('should sign audio/create transaction given valid props');
//   it.todo('should sign audio/stream transaction given valid props');
//   it.todo('should sign collection/create transaction given valid props');
//   it.todo('should sign collection/transfer transaction given valid props');
//   it.todo('should sign collection/setAttributes transaction given valid props');
//   it.todo('should sign profile/create transaction given valid props');
//   it.todo('should sign profile/setAttributes transaction given valid props');
//   it.todo('should sign subscription/purchase transaction given valid props');
// });
