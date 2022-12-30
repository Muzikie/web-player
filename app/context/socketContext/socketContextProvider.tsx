/* External dependencies */
import React, { createContext, useEffect, useState } from 'react';

/* Internal dependencies */
import { API_URLS, JSON_RPC_VERSION } from '~/constants/api';
import { DEFAULT_VALUES, EVENTS } from './constants';
import {
  SocketContextType,
  Method,
  RequestParams,
  SocketProviderProps,
  RequestResult,
} from './types';

export const SocketContext = createContext<SocketContextType>({
  ws: null,
  isConnected: false,
  request: () => new Promise(
    (_resolve, reject) => {
      reject({
        message: 'WS connection yet is not established',
        error: true,
      });
    }
  ),
});

const SocketProvider = ({ children }: SocketProviderProps) => {
  const [ws, setWS] = useState<WebSocket | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  const request = (method: Method, params: RequestParams) =>
    new Promise<RequestResult<Method>>((resolve, reject) => {
      if (ws) {
        ws.addEventListener(EVENTS.MESSAGE, (event) => {
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
        reject({
          message: 'WS connection is still not established',
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

  const value = {
    ws,
    isConnected,
    request,
  };

  return (
    <SocketContext.Provider value={value}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
