import { IconButton } from '~/components/common/Button';
import { EntityRowProps, PlaylistType } from '~/components/Entity/types';

const PlaylistSummary = ({ data }: EntityRowProps<PlaylistType>) => (
  <section className="component playlistSummary">
    <header>
      <h1>{ data.name }</h1>
      <div className="actionButtons">
        <IconButton
          icon="play"
          theme="primary medium"
          className="play"
          onClick={() => { console.log('Create the play logic'); }}
        />
        <IconButton
          icon="heart"
          theme="outlined small"
          className="follow"
          onClick={(e) => { console.log('Create the follow logic', e); }}
        />
      </div>
    </header>
    <figure className="photo">
      <img src={data.image} alt={ data.name } />
    </figure>
  </section>
);

export default PlaylistSummary;
