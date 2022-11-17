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
      const { result } = renderHook(() => useStorage());
      const key = '@test';
      const version = 1;
      const value = { test: 'test' };
      act(() => {
        result.current.storeData(key, version, value);
        expect(localStorage.getItem(key)).toEqual(JSON.stringify({ version, value }));
      });
    });

    it('should remove data', () => {
      const { result } = renderHook(() => useStorage());
      const key = '@test';
      const version = 1;
      const value = {};
      act(() => {
        result.current.storeData(key, version, value);
        expect(localStorage.getItem(key)).toEqual(null);
      });
    });
  });

  describe('retrieveData', () => {
    it('should retrieve data', () => {
      const { result } = renderHook(() => useStorage());
      const key = '@test';
      const version = 1;
      const value = { test: 'test' };

      act(() => {
        localStorage.setItem(key, JSON.stringify({ version, value }));
        expect(result.current.retrieveData(key, { test: 'default' })).toEqual(value);
      });
    });

    it('should migrate data', () => {
      const { result } = renderHook(() => useStorage());
      const key = '@test';
      const value = { test: 'test' };

      act(() => {
        localStorage.setItem(key, JSON.stringify({ version: 0, value }));
        expect(result.current.retrieveData(key, { test: 'default' })).toEqual({ test: value.test + '-migrated' });
      });
    });

    it('should return default value', () => {
      const { result } = renderHook(() => useStorage());
      const key = '@test';

      act(() => {
        expect(result.current.retrieveData(key, { test: 'default' })).toEqual({ test: 'default' });
      });
    });
  });
});
