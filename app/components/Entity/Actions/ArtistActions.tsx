import { IconButton } from '~/components/common/Button';
import { ArtistType, EntityRowProps } from '../types';

const ArtistActions = ({ data }: EntityRowProps<ArtistType>) => (
  <footer className="component entity action artist">
    <IconButton
      icon="heart"
      className="likeButton"
      onClick={() => console.log('Implement like functionality', data)}
    />
    <IconButton
      icon="more-vertical"
      className="contextMenu"
      onClick={() => console.log('Implement context menu functionality', data)}
    />
  </footer>
);

export default ArtistActions;
