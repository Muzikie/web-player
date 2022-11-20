import { renderHook, act } from '@testing-library/react-hooks';
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
  afterEach(() => {
    localStorage.clear();
  });

  describe('storeData', () => {
    it('should store data', () => {
      const key = '@test';
      const value = { test: 'test' };
      const { result } = renderHook(() => useStorage(key, value));
      const version = 1;
      act(() => {
        result.current.storeData(value);
        expect(localStorage.getItem(key)).toEqual(JSON.stringify({ version, value }));
      });
    });

    it('should remove data', () => {
      const key = '@test';
      const value = {};
      const { result } = renderHook(() => useStorage(key, value));
      act(() => {
        result.current.storeData(value);
        expect(localStorage.getItem(key)).toEqual(null);
      });
    });
  });

  describe('retrieveData', () => {
    it('should retrieve data', () => {
      const key = '@test';
      const value = { test: 'test' };
      const version = 1;
      localStorage.setItem(key, JSON.stringify({ version, value }));
      const { result } = renderHook(() => useStorage(key, { test: 'default' }));

      act(() => {
        expect(result.current.data).toEqual(value);
      });
    });

    it('should migrate data', () => {
      const key = '@test';
      const value = { test: 'test' };
      localStorage.setItem(key, JSON.stringify({ version: 0, value }));
      const { result } = renderHook(() => useStorage(key, value));

      act(() => {
        expect(result.current.data).toEqual({ test: value.test + '-migrated' });
      });
    });

    it('should return default value', () => {
      const key = '@test';
      const { result } = renderHook(() => useStorage(key, { test: 'default' }));

      act(() => {
        expect(result.current.data).toEqual({ test: 'default' });
      });
    });
  });
});
