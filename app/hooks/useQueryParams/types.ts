export interface QueryParam { 
  [key: string]: string;
}
export type SetQueryParam = (paramsToSet: QueryParam) => void;
export type RemoveQueryParam = (key: string) => void;
export type Response = {
  queryParams: QueryParam;
  setQueryParam: SetQueryParam;
  removeQueryParam: RemoveQueryParam;
}
