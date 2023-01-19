import type {
  CollectionType,
  AudioType,
  Entity,
} from '~/components/Entity/types';
import { API_URLS } from '~/constants/api';

export type SearchResultType = {
  [key: string]: Entity[];
}

const post = (url: string, body: any) => fetch(
  url,
  {
    method: 'POST',
    body,
  }
).then((res) => res.json()).then(res => res.data).catch(console.log);

export async function postCollection(json: Entity, file: File): Promise<CollectionType> {
  const data = new FormData();
  data.append('file', file);
  data.append('data', JSON.stringify(json));
  return post(`${API_URLS.STREAMER}/api/v1/collections`, data);
}

export async function postAudio(json: Entity, file: File): Promise<AudioType> {
  const data = new FormData();
  data.append('file', file);
  data.append('data', JSON.stringify(json));
  return post(`${API_URLS.STREAMER}/api/v1/audios`, data);
}
