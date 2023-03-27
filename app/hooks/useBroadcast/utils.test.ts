import { cryptography } from "@liskhq/lisk-client"
import { accountMock } from "../../../test/mocks/account"
import { COMMANDS, MODULES, SCHEMAS, VALID_GENRES } from "~/configs"
import { bufferize } from "~/helpers/convertors"
import { signTransaction } from "./utils"




describe('useBroadcast', () => {
  const account = {
    publicKey: accountMock.publickey,
    privateKey: accountMock.privateKey,
    // address: cryptography.address.getAddressFromLisk32Address(accountMock.address),
    address: accountMock.address,
    balances: [],
    nonce: '1',
  };

  const name = 'Test Audio';

  const fileContent = new Uint8Array([0x01, 0x02, 0x03, 0x04, 0x05, 0x06]);
  const mockFile = {
    name: 'filename.mp3',
    type: 'audio/mpeg',
    lastModified: Date.now(),
    size: fileContent.length,
    arrayBuffer: () => Promise.resolve(fileContent.buffer),
  } as File;

 
  it('should sign audio/create transaction given valid props', async () => {
    const command = COMMANDS.CREATE;
    const module = MODULES.AUDIO;
    const params = {
      name,
      releaseYear: "1994",
      fit: [],
      genre: [VALID_GENRES[0].value],
      collectionID: bufferize('ef2f53fca6966b5f5f6673f6ef3b0c17'),
      owners: [
        {
          address:  cryptography.address.getAddressFromLisk32Address('lskhqy429nwm2tew3j5j29ef6pguyynf6jxcmgrh2'),
          shares: 100,
        },
      ],
    };



    const files: { value: File; key: string }[] = [  { value: mockFile, key: 'audio' }];

   
    
    let result = await signTransaction({ command, module, params, files, account });
 
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