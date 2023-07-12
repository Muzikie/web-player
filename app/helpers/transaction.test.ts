import { HTTP_STATUS } from '~/configs';
import { DryRunTxResponse, ErrorResponse } from '~/context/socketContext/types';
import {
  getTransactionExecutionStatus,
} from './transaction';

describe('Transaction', () => {
  const dryRunCallError = {
    error: true,
    message: 'error',
  } as ErrorResponse;
  const DryRunExecutionError = {
    error: false,
    data: {
      events: [
        { module: 'audio', name: 'commandExecutionResult', topics: ['123'], data: { success: false } },
      ],
      success: true,
      result: 1
    },
  } as DryRunTxResponse;
  const DryRunExecutionSuccess = {
    error: false,
    data: {
      events: [
        { module: 'audio', name: 'commandExecutionResult', topics: ['123'], data: { success: true } },
      ],
      success: true,
      result: 1
    },
  } as DryRunTxResponse;
  const module = 'audio';
  const id = '123';

  describe('getTransactionExecutionStatus', () => {
    it('should return FAIL if response has error', () => {
      const result = getTransactionExecutionStatus(module, id, dryRunCallError);
      expect(result).toBe(HTTP_STATUS.BAD_REQUEST.CODE);
    });

    it('should return FAIL if response has an event with data 0800', () => {
      const result = getTransactionExecutionStatus(module, id, DryRunExecutionError);
      expect(result).toBe(HTTP_STATUS.BAD_REQUEST.CODE);
    });

    it('should return SUCCESS if response has an event with data 0801', () => {
      const result = getTransactionExecutionStatus(module, id, DryRunExecutionSuccess);
      expect(result).toBe(HTTP_STATUS.OK.CODE);
    });
  });
});
