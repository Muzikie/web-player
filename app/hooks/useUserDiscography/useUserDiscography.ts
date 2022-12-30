import { useState, useEffect } from 'react';

/* Internal dependencies */
import  { useAccount } from '../useAccount/useAccount';
import { useWS } from '../useWS/useWS';
import { Method, AudioAccountResponse, CollectionAccountResponse } from '~/context/socketContext/types';
import { FEEDBACK_MESSAGES } from './constants';

export const useUserDiscography = () => {
  const { info: { address } } = useAccount();
  const { request } = useWS();
  const [albums, setAlbums] = useState<string[]>([]);
  const [tracks, setTracks] = useState<string[]>([]);

  const getCollections = async () => {
    try {
      const response = <CollectionAccountResponse> await request(Method.collection_getAccount, { address });
      if (!response.error && response.data.collection.collections.length) {
        setAlbums(response.data.collection.collections);
      }
    } catch (e) {
      console.log(FEEDBACK_MESSAGES.ERROR_LOADING_ALBUMS, e);
    }
  };

  const getTracks = async () => {
    try {
      const response = <AudioAccountResponse> await request(Method.audio_getAccount, { address });
      if (!response.error && response.data.audio.audios.length) {
        setTracks(response.data.audio.audios);
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
    if (albums.length) {
      getTracks();
    }
  }, [albums]);

  return { albums, tracks };
};
