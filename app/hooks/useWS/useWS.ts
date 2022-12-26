import { useEffect, useState } from 'react';

/* Internal dependencies */
import { RequestParams, Method, RequestResult } from './types';
import { API_URLS, JSON_RPC_VERSION } from '~/constants/api';
import { DEFAULT_VALUES, EVENTS } from './constants';

export const useWS = () => {
  const [ws, setWS] = useState<WebSocket | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  const request = (method: Method, params: RequestParams) =>
    new Promise<RequestResult>((resolve, reject) => {
      console.log(' -- Promise -- ', isConnected);
      if (ws && isConnected) {
        ws.addEventListener(EVENTS.MESSAGE, (event) => {
          console.log(' -- MESSAGE -- ', event);
          try {
            const parsedData = JSON.parse(event.data);
            resolve({
              data: parsedData.result ?? DEFAULT_VALUES[method],
              error: false,
            });
          } catch (e) {
            reject({
              message: 'Request failed',
              error: true,
            });
          }
        });
        ws.send(
          JSON.stringify({
            jsonrpc: JSON_RPC_VERSION,
            id: '123', // @todo - generate a random id
            method,
            params
          }),
        );
      } else {
        console.log(' -- ELSE -- ');
        reject({
          message: 'WS connection is not established',
          error: true,
        });
      }
    });

  useEffect(() => {
    if (!ws) {
      const connection = new WebSocket(`${API_URLS.WS}/rpc-ws`);
      connection.addEventListener(EVENTS.OPEN, () => {
        setIsConnected(true);
      });
      setWS(connection);
    }
  }, [ws]);

  return {
    ws,
    isConnected,
    request,
  };
};
