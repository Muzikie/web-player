import { DryRunTxResponse } from '~/context/socketContext/types';
import { SUCCESS_CODE, TX_STATUS } from '~/configs/app';

export const getTransactionExecutionStatus = (module: string, id: string, response: DryRunTxResponse) => {
  if (response.error || !response.data.events.length) {
    return TX_STATUS.FAIL;
  }

  const expectedEventName = `${module}:commandExecutionResult`;
  const commandExecResultEvents = response.data.events.filter((e) =>
    `${e.module}:${e.name}` === expectedEventName);
  const txExecResultEvent = commandExecResultEvents.find((e) =>
    e.topics.includes(id));
  if (!txExecResultEvent) {
    return TX_STATUS.FAIL;
  }
  return txExecResultEvent.data === SUCCESS_CODE ? TX_STATUS.SUCCESS : TX_STATUS.FAIL;
};
