import { Collection, Audio, Profile, API_URLS } from '~/configs';

export interface SearchResultType {
  audio: Audio[];
  profile: Profile[];
  collection: Collection[];
}

interface JSON { [key: string]: any }
interface Asset {
  key: string;
  value: File;
}

interface TransactionSuccess {
  _id: string;
}

interface TransactionFailure {
  error: string;
}

const get = (url: string) => fetch(url).then((res) => res.json()).then(res => res.data);
const post = (url: string, body: any) => fetch(
  url,
  {
    method: 'POST',
    body,
  }
).then((res) => res.json()).then(res => res.data).catch(console.log);

export async function postTransaction(json: JSON, files: Asset[]): Promise<TransactionSuccess|TransactionFailure> {
  const data = new FormData();
  files.forEach((file) => data.append(file.key, file.value));
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
