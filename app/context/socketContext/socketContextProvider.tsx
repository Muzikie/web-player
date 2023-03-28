/* External dependencies */
import React, { createContext, useEffect, useState } from 'react';

/* Internal dependencies */
import { API_URLS, JSON_RPC_VERSION } from '~/configs';
import { DEFAULT_VALUES, EVENTS, MESSAGES } from './constants';
import {
  SocketContextType,
  Method,
  RequestParams,
  SocketProviderProps,
  RequestResult,
} from './types';

const getID = () => (1000 * Math.random()).toFixed(0);

export const SocketContext = createContext<SocketContextType>({
  ws: null,
  isConnected: false,
  request: () => new Promise(
    (_resolve, reject) => {
      reject({
        message: MESSAGES.NOT_READY,
        error: true,
      });
    }
  ),
});

const SocketProvider = ({ children }: SocketProviderProps) => {
  const [ws, setWS] = useState<WebSocket | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  const request = (method: Method, params: RequestParams, id: string = getID()) =>
    new Promise<RequestResult<Method>>((resolve, reject) => {
      if (ws) {
        ws.addEventListener(EVENTS.MESSAGE, (event) => {
          const parsedData = JSON.parse(event.data);
          if (id === parsedData.id) {
            resolve({
              data: parsedData.result ?? DEFAULT_VALUES[method],
              error: false,
            });
          }
        });
        ws.send(
          JSON.stringify({
            jsonrpc: JSON_RPC_VERSION,
            id,
            method,
            params
          }),
        );
      } else {
        reject({
          message: MESSAGES.NOT_READY,
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
