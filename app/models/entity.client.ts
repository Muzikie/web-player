import type { Entity } from '~/components/Entity/types';
import { Collection, Audio, Profile, API_URLS } from '~/configs';

export type SearchResultType = {
  audio: Audio[];
  profile: Profile[];
  collection: Collection[];
}

const get = (url: string) => fetch(url).then((res) => res.json()).then(res => res.data);
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

export async function search(query: string): Promise<SearchResultType> {
  const promise1 = <Promise<Profile[]>> get(`${API_URLS.STREAMER}/api/v1/profiles?name=${query}`);
  const promise2 = <Promise<Profile[]>> get(`${API_URLS.STREAMER}/api/v1/profiles?nickName=${query}`);
  const promise3 = <Promise<Audio[]>> get(`${API_URLS.STREAMER}/api/v1/audios?name=${query}`);
  const promise4 = <Promise<Collection[]>> get(`${API_URLS.STREAMER}/api/v1/collections?name=${query}`);

  const [names, nickNames, audio, collection] = await Promise.all([promise1, promise2, promise3, promise4]);

  return {
    profile: [...names, ...nickNames],
    audio,
    collection,
  };
}
