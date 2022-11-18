import React, {
  useEffect,
  useRef,
  useState,
  useContext,
  MutableRefObject,
} from 'react';
import { Link } from '@remix-run/react';
import { PlayerContext } from '~/context/playerContext/playerContextProvider';
import { IconButton } from '~/components/common/Button';
import EntityThumbnail from '~/components/Entity/EntityThumbnail';
import { API_URLS } from '~/constants/api';
import ProgressBar from './ProgressBar';

const Player = () => {
  const {
    current,
    isPlaying,
    setIsPlaying,
  } = useContext(PlayerContext);
  const audioRef = useRef() as MutableRefObject<HTMLAudioElement>;
  const [progress, setProgress] = useState(0);

  const playPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const onTimeUpdate = () => {
    setProgress(audioRef.current.currentTime);
  };

  useEffect(() => {
    if (progress !== audioRef.current.currentTime) {
      if (Math.abs(Math.round(progress) - Math.round(audioRef.current.currentTime)) > 2) {
        audioRef.current.currentTime = progress;
      }
    }
  }, [progress]);

  return (
    <section className={`component player ${current ? 'playing' : ''}`}>
      <section className="playingMusic">
        {
          current?.id && (
            <Link to={`/album/${current?.id}`}>
              <EntityThumbnail data={current} className="circle" />
            </Link>
          )
        }
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
