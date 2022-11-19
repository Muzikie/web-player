import React, { useContext } from 'react';
import { Link } from '@remix-run/react';
import { useAudio } from '~/hooks/useAudio';
import { PlayerContext } from '~/context/playerContext/playerContextProvider';
import { ProfileContext } from '~/context/profileContext/profileContextProvider';
import { IconButton } from '~/components/common/Button';
import EntityThumbnail from '~/components/Entity/EntityThumbnail';
import { API_URLS } from '~/constants/api';
import ProgressBar from './ProgressBar';

const Player = () => {
  const {
    audioRef,
    playPause,
    onTimeUpdate,
    progress,
    setProgress,
  } = useAudio();
  const {
    current,
    isPlaying,
  } = useContext(PlayerContext);
  const { info } = useContext(ProfileContext);

  return (
    <section className={`component player ${current && info.address ? 'playing' : ''}`}>
      <section className="playingMusic">
        <Link to={`/album/${current?.id ?? ''}`}>
          { current && <EntityThumbnail data={current} /> }
        </Link>
        <header>
          <h5>{ current?.name ?? '...' }</h5>
          <span>{ current?.artistName ?? '...' }</span>
        </header>
      </section>
      <audio
        src={`${API_URLS.STREAMER}/${current?.id}`}
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
