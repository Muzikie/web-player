import { IconButton } from '~/components/common/Button';
import { EntityRowProps, ArtistType } from '~/component/Entity/types';

const ArtistSummary = ({ data }: EntityRowProps<ArtistType>) => (
  <section className="component artistSummary">
    <header>
      <h1>{ data.name }</h1>
      <h4 className="releaseDate">{ data.description }</h4>
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
      {/* <img src={selena} alt="Selena Gomez" /> */}
    </figure>
  </section>
);

export default ArtistSummary;
