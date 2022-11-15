import { useStorage } from './useStorage';

jest.mock('./migrations', () => ({
  migrations: [
    {
      key: '@test',
      version: 1,
      migrate: jest.fn(value => ({ test: value.test + '-migrated' })),
    }
  ]
}));

describe('useStorage', () => {
  describe('storeData', () => {
    it('should store data', () => {
      const { storeData } = useStorage();
      const key = '@test';
      const version = 1;
      const value = { test: 'test' };
      storeData(key, version, value);
      expect(localStorage.getItem(key)).toEqual(JSON.stringify({ version, value }));
    });

    it('should remove data', () => {
      const { storeData } = useStorage();
      const key = '@test';
      const version = 1;
      const value = {};
      storeData(key, version, value);
      expect(localStorage.getItem(key)).toEqual(null);
    });
  });

  describe('retrieveData', () => {
    it('should retrieve data', () => {
      const { retrieveData } = useStorage();
      const key = '@test';
      const version = 1;
      const value = { test: 'test' };
      localStorage.setItem(key, JSON.stringify({ version, value }));

      expect(retrieveData(key)).toEqual(value);
    });

    it('should migrate data', () => {
      const { retrieveData } = useStorage();
      const key = '@test';
      const value = { test: 'test' };
      localStorage.setItem(key, JSON.stringify({ version: 0, value }));

      expect(retrieveData(key)).toEqual({ test: value.test + '-migrated' });
    });
  });
});
