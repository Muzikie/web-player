export interface ArtistType {
  name: string;
  image: any;
  description?: string;
  id: string;
  ownerId: string;
}

interface ArtistProps {
  data: ArtistType
}
