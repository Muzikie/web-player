export interface AlbumType {
  name: string;
  image: any;
  id: string;
  artistName: string;
  artistId: string;
  releaseDate: number;
  ownerId: string;
}

interface AlbumProps {
  data: AlbumType
}
