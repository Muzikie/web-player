import React from 'react';
import { useContext, MouseEvent } from 'react';
import { Link } from '@remix-run/react';
import { PlayerContext } from '~/context/playerContextProvider';
import { IconButton } from '~/components/common/Button';
import EntityThumbnail from '~/components/Entity/EntityThumbnail';

const Player = () => {
  const { current, queue, nextTrack, prevTrack } = useContext(PlayerContext);

  const playPause = (e: MouseEvent) => {
    e.preventDefault();
    console.log('Implement playPause functionality');
  };

  return (
    <section className={`component player ${current ? 'playing' : ''}`}>
      <section className="playingMusic">
        {
          current && (
            <Link to={`/album/${current.id}`}>
              <EntityThumbnail data={current} className="circle" />
            </Link>
          )
        }
        <header>
          <h5>{ current?.name ?? '-' }</h5>
          <span>{ current?.artistName ?? '-' }</span>
        </header>
      </section>
      
      <section className="seek">
        <span className="bar"></span>
        <time><small>{ current?.duration ?? '-' }</small></time>
      </section>

      <section className="controls">
        <IconButton
          icon="rewind"
          className="rewind"
          onClick={prevTrack}
          disabled={!prevTrack || queue.length === 0}
        />
        <IconButton
          icon="play"
          className="play"
          onClick={playPause}
        />
        <IconButton
          disabled={!nextTrack || queue.length === 0}
          icon="fast-forward"
          className="fastForward"
          onClick={prevTrack}
        />
      </section>
    </section>
  );
}

export default Player;
