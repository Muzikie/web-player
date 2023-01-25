import type { Entity } from '~/components/Entity/types';
import { Collection, Audio, API_URLS } from '~/configs';

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

export async function postCollection(json: any, file: File): Promise<Collection> {
  const data = new FormData();
  data.append('file', file);
  data.append('data', JSON.stringify(json));
  return post(`${API_URLS.STREAMER}/api/v1/collections`, data);
}

export async function postAudio(json: Entity, file: File): Promise<Audio> {
  const data = new FormData();
  data.append('file', file);
  data.append('data', JSON.stringify(json));
  return post(`${API_URLS.STREAMER}/api/v1/audios`, data);
}

export async function postTransaction(json: any, file: File, fileName: string): Promise<Entity> {
  const data = new FormData();
  data.append(fileName, file);
  data.append('data', JSON.stringify(json));
  return post(`${API_URLS.STREAMER}/api/v1/transactions`, data);
}
