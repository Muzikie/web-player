import React from 'react';
import { useLocation } from 'wouter';
import { modals } from '../routes';
import styles from './modal.css';

interface  ModalProps {
  alignment?: 'centered'|'topAligned';
}

interface QueryParam { 
  [key: string]: string;
 }

const useQueryParams = () => {
  const [location, setLocation] = useLocation();
  const params = window.location.search;
  const parsed = new URLSearchParams(params);
  const queryParams: QueryParam = {};
  parsed.forEach((value, key) => {
    queryParams[key] = value;
  });

  type SetQueryParam = (paramsToSet: QueryParam) => void;
  const setQueryParam: SetQueryParam = (paramsToSet) => {
    const newParams = {
      ...queryParams,
      ...paramsToSet,
    };

    const newParsed = new URLSearchParams(newParams);
    const stringified = newParsed.toString();

    setLocation(`${location}?${stringified}`);
  };

  type RemoveQueryParam = (key: string) => void;
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

  const result: [QueryParam, SetQueryParam, RemoveQueryParam] = [queryParams, setQueryParam, removeQueryParam];
  return result;
};

function Modal ({ alignment = 'centered' }: ModalProps) {
  const [queryParams, _, removeQueryParam] = useQueryParams();
  
  const close = () => {
    removeQueryParam('modal');
  };

  if (!queryParams.modal) {
    return null;
  }

  if (!modals[queryParams.modal]) {
    console.log('The queried modal was not found.', queryParams.modal);
    return null;
  }

  const Component = modals[queryParams.modal].component;
  return (
    <div className={`${styles.wrapper} ${alignment}`}>
      <div
        className={styles.backdrop}
        onClick={close}
      />
      <Component />
    </div>
  );
}

export default Modal;
