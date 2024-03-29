import {
  Collection,
  Audio,
  Profile,
  Auth,
  Balance,
  API_URLS,
  API_VERSION,
  EndpointParams,
  AwaitedEndpointResult,
  DEV_ACCOUNT,
  Subscription,
} from '~/configs';
import { removeNullValues } from '~/helpers/helpers';
import type {
  Asset,
  PostOptions,
  SearchResultType,
  transactionCreationProps,
  DryRunTxResponse,
  PostTxResponse,
} from './types';

const getList = (entity: string, params: EndpointParams) => {
  const validatedParams = removeNullValues(params);
  const search = new URLSearchParams(validatedParams);
  const queryString = search.toString();
  return fetch(`${API_URLS.STREAMER}/api/${API_VERSION}/${entity}?${queryString}`)
    .then((res) => res.json());
};

const get = (url: string) => fetch(url).then((res) => res.json()).then(res => res.data);
const post = (url: string, body: any, options: PostOptions = {}) => fetch(
  url,
  {
    method: 'POST',
    ...options,
    body,
  }
).then(res => res.json());

export async function uploadFiles(id: string, files: Asset[]): Promise<string[]> {
  return Promise.all<string>(files.filter(item => !!item.value).map(({ value, key }) => {
    const data = new FormData();
    data.append('file', value);

    return post(
      `${API_URLS.STORAGE}/upload/${id}${key}`,
      data,
    );
  })).catch(err => err.message);
}

export async function search(query: string): Promise<SearchResultType> {
  const promise1 = <Promise<Profile[]>> get(`${API_URLS.STREAMER}/api/${API_VERSION}/profiles?search=${query}`);
  const promise3 = <Promise<Audio[]>> get(`${API_URLS.STREAMER}/api/${API_VERSION}/audios?search=${query}`);
  const promise4 = <Promise<Collection[]>> get(`${API_URLS.STREAMER}/api/${API_VERSION}/collections?search=${query}`);
  
  const [profile, audio, collection] = await Promise.all([promise1, promise3, promise4]);

  return {
    profile: profile || [],
    audio: audio || [],
    collection: collection || [],
  };
}

export async function getSubscriptionIDs(): Promise<string[]> {
  const results = await getList('subscriptions', { creatorAddress: DEV_ACCOUNT.ADDRESS });
  return results.data.map((item: Subscription) => item.subscriptionID);
}

export async function getSubscriptions({ params }: { params: EndpointParams }): AwaitedEndpointResult<Array<Subscription>> {
  return getList('subscriptions', params);
}

export async function getAuth({ params }: { params: EndpointParams }): Promise<Auth> {
  const results = await getList('auth', params);
  const newAccount = {
    nonce: '0',
    optionalKeys: [],
    mandatoryKeys: [],
  };
  return results?.data ?? newAccount;
}

export async function getTokenBalances({ params }: { params: EndpointParams }): AwaitedEndpointResult<Array<Balance>> {
  return getList('token/balances', params);
}

export async function dryRunTransaction(params: transactionCreationProps): Promise<DryRunTxResponse> {
  const JsonPostOptions: PostOptions = {
    headers: {
      'Content-Type': 'application/json',
    },
    mode: 'cors',
  };
  return post(
    `${API_URLS.STREAMER}/api/${API_VERSION}/transactions/dryrun`,
    JSON.stringify(params),
    JsonPostOptions
  ).catch(console.log);
}

export async function broadcastTransaction(params: transactionCreationProps): Promise<PostTxResponse> {
  const JsonPostOptions: PostOptions = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  return post(
    `${API_URLS.STREAMER}/api/${API_VERSION}/transactions`,
    JSON.stringify(params),
    JsonPostOptions
  ).catch(console.log);
}
