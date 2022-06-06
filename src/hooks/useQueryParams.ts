import { useLocation } from 'wouter';

interface QueryParam { 
  [key: string]: string;
}
type SetQueryParam = (paramsToSet: QueryParam) => void;
type RemoveQueryParam = (key: string) => void;

const useQueryParams = (): [QueryParam, SetQueryParam, RemoveQueryParam] => {
  const [location, setLocation] = useLocation();
  const params = window.location.search;
  const parsed = new URLSearchParams(params);
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

    setLocation(`${location}?${stringified}`);
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

    setLocation(`${location}?${stringified}`);
  };

  return [queryParams, setQueryParam, removeQueryParam];
};

export default useQueryParams;
