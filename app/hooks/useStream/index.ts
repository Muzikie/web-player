import { useState, useEffect } from 'react';

import {
  MODULES,
  COMMANDS,
} from '~/configs';
import { useAccount } from '../useAccount/useAccount';
import { bufferize } from '~/helpers/convertors';
import { useBroadcast } from '../useBroadcast/useBroadcast';

export const useStream = () => {
  const { account } = useAccount();
  const [queue, setQueue] = useState<string[]>([]);
  const [broadcastStatus, setBroadcastStatus] = useState({ error: false, message: '' });
  const { broadcast } = useBroadcast();

  const registerStream = (audioID: string) => {
    setQueue((prevQueue) => [...prevQueue, audioID]);
  };

  const registerOne = async (audioID: string) => {
    const result = await broadcast({
      module: MODULES.AUDIO,
      command: COMMANDS.STREAM,
      params: {
        audioID: bufferize(audioID),
      },
      account,
    });
    setBroadcastStatus(result);
    if (!result.error) {
      setQueue((prevQueue) => prevQueue.filter(item => item !== audioID));
    }
  };

  useEffect(() => {
    if (queue.length) {
      const oldestAudioID = queue[0];
      registerOne(oldestAudioID);
    }
  }, [queue]);

  return {
    registerStream,
    broadcastStatus,
  };
};
