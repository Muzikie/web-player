import { renderHook, act } from '@testing-library/react-hooks';
import { Navigate } from 'react-router-dom';

import { useQueryParams } from './useQueryParams';

jest.mock('react-router-dom', () => ({
  useLocation: jest.fn(() => ({
    search: '?foo=bar&baz=qux',
    pathname: 'http://localhost:3000'
  })),
  Navigate: jest.fn()
}));

describe('useQueryParams', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should convert querystring to an object', () => {
    const { result } = renderHook(() => useQueryParams());

    expect(result.current.queryParams).toEqual({
      foo: 'bar',
      baz: 'qux'
    });
  });

  it('should set new key-values to the query string and navigate to the new url', () => {
    const { result } = renderHook(() => useQueryParams());

    act(() => {
      result.current.setQueryParam({ foo: 'baz', koo: 'liz' });
    });

    expect(Navigate).toHaveBeenCalledWith({
      to: 'http://localhost:3000?foo=baz&baz=qux&koo=liz'
    });
  });

  it('should remove given key and its value from the query string and navigate to the new url', () => {
    const { result } = renderHook(() => useQueryParams());

    act(() => {
      result.current.removeQueryParam('foo');
    });

    expect(Navigate).toHaveBeenCalledWith({
      to: 'http://localhost:3000?baz=qux'
    });
  });
});
