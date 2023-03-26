// import { signTransaction } from './utils';

describe('signTransaction', () => {
  it.todo('should return error if the schema was not found');
  it.todo('should return error if transaction does not match the schema');
  describe('Valid transactions', () => {
    // signature is a buffer of length 64. check if all expected values are returned
    it.todo('should sign audio/create transaction given valid props');
    it.todo('should sign audio/stream transaction given valid props');
    it.todo('should sign collection/create transaction given valid props');
    it.todo('should sign collection/transfer transaction given valid props');
    it.todo('should sign collection/setAttributes transaction given valid props');
    it.todo('should sign profile/create transaction given valid props');
    it.todo('should sign profile/setAttributes transaction given valid props');
    it.todo('should sign subscription/purchase transaction given valid props');
  });
});
