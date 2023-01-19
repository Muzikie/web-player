/* External dependencies */
import React, { useContext, useRef, MutableRefObject } from 'react';

/* Internal dependencies */
import { Link } from '~/components/common/Link';
import { useAudio } from '~/hooks/useAudio/useAudio';
import { PlayerContext } from '~/context/playerContext/playerContextProvider';
import { IconButton } from '~/components/common/Button';
import { API_URLS } from '~/constants/api';
import EntityThumbnail from '~/components/Entity/EntityThumbnail';
import PlaceHolderImage from './PlaceHolderImage';
import ProgressBar from './ProgressBar';

const PlayerContent = () => {
  const audioRef = useRef() as MutableRefObject<HTMLAudioElement>;
  const {
    playPause,
    onTimeUpdate,
    progress,
    duration,
    setProgress,
  } = useAudio(audioRef);
  const {
    current,
    isPlaying,
  } = useContext(PlayerContext);

  return (
    <>
      <section className="primaryInfo">
        <Link to={`/collection/${current?.audioID ?? ''}`}>
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
        src={current?.audioID ? `${API_URLS.STREAMER}/api/v1/audios/stream/${current?.audioID}` : ''}
        ref={audioRef}
        data-audio-id={current?.audioID}
        onTimeUpdate={onTimeUpdate}
      />
      <ProgressBar
        duration={duration}
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
    </>
  );
}

export default PlayerContent;
