import { DryRunTxResponse } from '~/context/socketContext/types';
import { HTTP_STATUS, SUCCESS_CODE } from '~/configs';

export const getTransactionExecutionStatus = (module: string, id: string, response: DryRunTxResponse) => {
  if (response.error || !response.data.events.length) {
    return HTTP_STATUS.BAD_REQUEST.CODE;
  }

  const expectedEventName = `${module}:commandExecutionResult`;
  const commandExecResultEvents = response.data.events.filter((e) =>
    `${e.module}:${e.name}` === expectedEventName);
  const txExecResultEvent = commandExecResultEvents.find((e) =>
    e.topics.includes(id));
  if (!txExecResultEvent) {
    return HTTP_STATUS.BAD_REQUEST.CODE;
  }
  return txExecResultEvent.data === SUCCESS_CODE ? HTTP_STATUS.OK.CODE : HTTP_STATUS.BAD_REQUEST.CODE;
};
