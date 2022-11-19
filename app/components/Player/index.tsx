/* External dependencies */
import React, { useContext, useRef, MutableRefObject } from 'react';
import { Link } from '@remix-run/react';

/* Internal dependencies */
import { useAudio } from '~/hooks/useAudio/useAudio';
import { PlayerContext } from '~/context/playerContext/playerContextProvider';
import { ProfileContext } from '~/context/profileContext/profileContextProvider';
import { IconButton } from '~/components/common/Button';
import EntityThumbnail from '~/components/Entity/EntityThumbnail';
import { API_URLS } from '~/constants/api';
import PlaceHolderImage from './PlaceHolderImage';
import ProgressBar from './ProgressBar';

const Player = () => {
  const audioRef = useRef() as MutableRefObject<HTMLAudioElement>;
  const {
    playPause,
    onTimeUpdate,
    progress,
    setProgress,
  } = useAudio(audioRef);
  const {
    current,
    isPlaying,
  } = useContext(PlayerContext);
  const { info } = useContext(ProfileContext);

  return (
    <section className={`component player ${current && info.address ? 'playing' : ''}`}>
      <section className="playingMusic">
        <Link to={`/album/${current?.id ?? ''}`}>
          { current
            ? <EntityThumbnail data={current} />
            : <PlaceHolderImage />
          }
        </Link>
        <header>
          <h5>{ current?.name ?? '...' }</h5>
          <span>{ current?.artistName ?? '...' }</span>
        </header>
      </section>
      <audio
        src={`${API_URLS.STREAMER}/${current?.id}?publicKey=${info.publicKey}`}
        ref={audioRef}
        onTimeUpdate={onTimeUpdate}
      />
      <ProgressBar
        duration={Number(current?.duration) ?? 0}
        progress={progress}
        setProgress={setProgress}
      />
      <section className="controls">
        <IconButton
          icon={isPlaying ? 'pause' : 'play'}
          className="play"
          onClick={playPause}
        />
      </section>
    </section>
  );
}

export default Player;
