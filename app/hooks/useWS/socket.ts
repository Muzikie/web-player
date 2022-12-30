import WebSocket from 'ws';

import { RequestParams, Method, RequestResult } from './types';
import { API_URLS, JSON_RPC_VERSION } from '~/constants/api';
import { EVENTS } from './constants';

export class Socket {
  constructor () {
    this.create();
  }

  private isConnected = false;
  private ws: WebSocket|null = null;

  private create () {
    this.ws = new WebSocket(`${API_URLS.WS}/rpc-ws`);
    this.ws.addEventListener(EVENTS.OPEN, () => {
      this.isConnected = true;
    });
  }

  public request (method: Method, params: RequestParams) {
    return new Promise<RequestResult<Method>>((resolve, reject) => {
      if (!this.ws || !this.isConnected) {
        reject({
          message: 'WS connection is not established',
          error: true,
        });
      } else {
        this.ws.addEventListener(EVENTS.MESSAGE, (event: WebSocket.MessageEvent) => {
          if (typeof event.data !== 'string') {
            reject({
              message: 'Request failed',
              error: true,
            });
          } else {
            const parsedData = JSON.parse(event.data);
            if (parsedData.error) {
              reject({
                message: parsedData.error.message,
                error: true,
              });
            } else {
              resolve(parsedData.result);
            }
          }
        });
        this.ws.send(
          JSON.stringify({
            jsonrpc: JSON_RPC_VERSION,
            id: '123', // @todo - generate a random id
            method,
            params
          }),
        );
      }
    });
  }
}

export default new Socket();
