export enum ValidationStatus {
  pending = 'PENDING',
  clean = 'CLEAN',
  invalid = 'INVALID',
  valid = 'VALID',
}

export interface AudioNFTData {
  name: string;
  releaseYear: string;
  artistName: string;
  collectionID: string;
  genre: number[];
  files: FileList | null;
}

export interface CollectionNFTData {
  name: string;
  releaseYear: string;
  artistName: string;
  collectionType: number;
  files: FileList | null;
}

export type validateProps = AudioNFTData | CollectionNFTData;

export type EntityName = 'audio' | 'collection';
