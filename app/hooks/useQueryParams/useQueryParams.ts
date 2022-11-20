import { useLocation, Navigate } from 'react-router-dom';

interface QueryParam { 
  [key: string]: string;
}
type SetQueryParam = (paramsToSet: QueryParam) => void;
type RemoveQueryParam = (key: string) => void;

export const useQueryParams = (): [QueryParam, SetQueryParam, RemoveQueryParam] => {
  const location = useLocation();
  const parsed = new URLSearchParams(location.search.toString());
  const queryParams: QueryParam = {};
  parsed.forEach((value, key) => {
    queryParams[key] = value;
  });

  const setQueryParam: SetQueryParam = (paramsToSet) => {
    const newParams = {
      ...queryParams,
      ...paramsToSet,
    };

    const newParsed = new URLSearchParams(newParams);
    const stringified = newParsed.toString();

    Navigate({ to: `${location}?${stringified}` });
  };

  const removeQueryParam: RemoveQueryParam = (key) => {
    const initialValue: QueryParam = {};
    const newParams: QueryParam = Object.keys(queryParams).reduce((acc, item) => {
      if (item !== key) {
        acc[item] = queryParams[item];
      }

      return acc;
    }, initialValue);

    const newParsed = new URLSearchParams(newParams);
    const stringified = newParsed.toString();

    Navigate({ to: `${location}?${stringified}` });
  };

  return [queryParams, setQueryParam, removeQueryParam];
};
