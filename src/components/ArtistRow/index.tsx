export interface ArtistType {
  name: string;
  image: any;
  id: string;
  ownerId: string;
}

interface ArtistProps {
  data: ArtistType
}
