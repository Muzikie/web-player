import { useState, useEffect } from 'react';

/* Internal dependencies */
import  { useAccount } from '../useAccount/useAccount';
import { useWS } from '../useWS/useWS';
import { Method, AudioAccountResponse, CollectionAccountResponse } from '~/context/socketContext/types';
import { FEEDBACK_MESSAGES } from './constants';

export const useUserDiscography = () => {
  const { info: { address } } = useAccount();
  const { request } = useWS();
  const [collections, setCollections] = useState<string[]>([]);
  const [audios, setAudios] = useState<string[]>([]);

  const getCollections = async () => {
    try {
      const response = <CollectionAccountResponse> await request(Method.collection_getAccount, { address });
      if (!response.error && response.data.collection.collections.length) {
        setCollections(response.data.collection.collections);
      }
    } catch (e) {
      console.log(FEEDBACK_MESSAGES.ERROR_LOADING_ALBUMS, e);
    }
  };

  const getAudios = async () => {
    try {
      const response = <AudioAccountResponse> await request(Method.audio_getAccount, { address });
      if (!response.error && response.data.audio.audios.length) {
        setAudios(response.data.audio.audios);
      }
    } catch (e) {
      console.log(FEEDBACK_MESSAGES.ERROR_LOADING_TRACKS, e);
    }
  };

  useEffect(() => {
    if (address) {
      getCollections();
    }
  }, [address]);

  useEffect(() => {
    if (collections.length) {
      getAudios();
    }
  }, [collections]);

  return { collections, audios };
};
