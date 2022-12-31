import { address as cryptoAddress } from '@liskhq/lisk-cryptography';

export const DERIVATION_PATH = "m/44'/134'/0'";
export const CHAIN_ID = '00000000';
export const VALID_GENRES = [
  { value: 0, label: 'Pop' },
  { value: 1, label: 'Soul' },
  { value: 2, label: 'Rock' },
  { value: 3, label: 'Hip-Hop & Rap' },
  { value: 4, label: 'Country' },
  { value: 5, label: 'R&B' },
  { value: 6, label: 'Folk' },
  { value: 7, label: 'Jazz' },
  { value: 8, label: 'Heavy Metal' },
  { value: 9, label: 'EDM' },
  { value: 10, label: 'Psychedelic Rock' },
  { value: 11, label: 'Funk' },
  { value: 12, label: 'Reggae' },
  { value: 13, label: 'Disco' },
  { value: 14, label: 'Punk Rock' },
  { value: 15, label: 'Classical' },
  { value: 16, label: 'House' },
  { value: 17, label: 'Techno' },
  { value: 18, label: 'Indie Rock' },
  { value: 19, label: 'Grunge' },
  { value: 20, label: 'Ambient' },
  { value: 21, label: 'Gospel' },
  { value: 22, label: 'Latin Music' },
  { value: 23, label: 'Grime' },
  { value: 24, label: 'Trap' },
];

export const VALID_COLLECTION_TYPES = [
  { value: 1, label: 'Album' },
  { value: 2, label: 'Podcast series' },
];

const lisk32DevAddress = 'lskh96jgzfftzff2fta2zvsmba9mvs5cnz9ahr3ke';
const lisk32Treasury = 'lskyg9ujmpkbn7ex96ejedhfrkj6avryn5nwgngbp';
export const DEV_ACCOUNT = {
  ADDRESS: lisk32DevAddress,
  LISK32: cryptoAddress.getAddressFromLisk32Address(lisk32DevAddress)
};
export const TREASURY_ACCOUNT = {
  ADDRESS: lisk32Treasury,
  LISK32: cryptoAddress.getAddressFromLisk32Address(lisk32Treasury)
};
