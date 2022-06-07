export interface AlbumType {
  name: string;
  image: string;
  id: string;
  artistName: string;
  artistId: string;
  releaseDate: number;
  ownerId: string;
  description: string;
}

interface AlbumProps {
  data: AlbumType
}
