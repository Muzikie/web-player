export enum ValidationStatus {
  pending = 'PENDING',
  clean = 'CLEAN',
  invalid = 'INVALID',
  valid = 'VALID',
}

export interface TrackNFTData {
  name: string;
  releaseYear: string;
  artistName: string;
  collectionID: string;
  genre: number[];
  files: FileList | null;
}

export interface AlbumNFTData {
  name: string;
  releaseYear: string;
  artistName: string;
  collectionType: number;
  files: FileList | null;
}

export type validateProps = TrackNFTData | AlbumNFTData;

export type EntityName = 'track' | 'album';
