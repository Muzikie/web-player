/* External dependencies */
import React, { useContext, useRef, MutableRefObject } from 'react';

/* Internal dependencies */
import { Link } from '~/components/common/Link';
import { useAudio } from '~/hooks/useAudio/useAudio';
import { PlayerContext } from '~/context/playerContext/playerContextProvider';
import { IconButton } from '~/components/common/Button';
import { API_URLS, Audio, FILES } from '~/configs';
import EntityThumbnail from '~/components/Entity/EntityThumbnail';
import { ROUTES } from '~/routes/routes';
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
        <Link to={ROUTES.COLLECTION.replace(':id', current?.audioID ?? '')}>
          <EntityThumbnail data={current || {} as Audio} />
        </Link>
        <header>
          <h5>{ current?.name ?? '...' }</h5>
          <span>{ current?.creatorAddress ?? '...' }</span>
        </header>
      </section>
      <audio
        src={current?.audioID ? `${API_URLS.STORAGE}/stream/${current?.audioID}${FILES.audio.secondary}` : ''}
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
};

export default PlayerContent;
