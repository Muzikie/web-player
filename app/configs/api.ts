export const API_URLS = {
  STREAMER: 'http://localhost:4002',
  WS: 'ws://localhost:7887',
};
export const HTTP_STATUS = {
  OK: { CODE: 200, MESSAGE: 'OK' },
  CREATED: { CODE: 201, MESSAGE: 'Created' },
  NO_CONTENT: { CODE: 204, MESSAGE: 'No Content' },
  BAD_REQUEST: { CODE: 400, MESSAGE: 'Bad Request' },
  UNAUTHORIZED: { CODE:  401, MESSAGE: 'Unauthorized' },
  FORBIDDEN: { CODE: 403, MESSAGE: 'Forbidden' },
  NOT_FOUND: { CODE: 404, MESSAGE: 'Not Found' },
  NOT_SIGNED: { CODE: 405, MESSAGE: 'Not Signed' },
  PENDING: { CODE: 600, MESSAGE: 'Pending' },
};
