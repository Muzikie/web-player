import { useContext } from 'react';

/* Internal dependencies */
import { SocketContext } from '~/context/socketContext/socketContextProvider';

export const useWS = () => useContext(SocketContext);
