import { DryRunTxResponse } from '~/context/socketContext/types';
import { HTTP_STATUS } from '~/configs';

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
  return txExecResultEvent?.data?.success ? HTTP_STATUS.OK.CODE : HTTP_STATUS.BAD_REQUEST.CODE;
};

export const getEntityIDFromDryRunEvents = (module: string, response: DryRunTxResponse): string => {
  if (response.error || !response.data.events.length) {
    return '';
  }

  // Get command specific event, if it exists, it includes the entityID
  const commandAcceptanceEvent = response.data.events.filter((e) =>
    e.module === module && e.name !== 'commandExecutionResult');

  if (!commandAcceptanceEvent.length) {
    return '';
  }
  return commandAcceptanceEvent[0].data[`${module}ID`] as string;
};
