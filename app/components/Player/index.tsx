import React, { useEffect, useRef, useState } from 'react';
import { useContext, MouseEvent } from 'react';
import { Link } from '@remix-run/react';
import { PlayerContext } from '~/context/playerContextProvider';
import { IconButton } from '~/components/common/Button';
import EntityThumbnail from '~/components/Entity/EntityThumbnail';
import { API_URLS } from '~/constants/api';
import ProgressBar from './ProgressBar';

const Player = () => {
  const {
    current,
    queue,
    isPlaying,
    setIsPlaying,
    prevTrack,
    nextTrack,
  } = useContext(PlayerContext);
  const [init, setInit] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const audio = useRef();

  const updateProgress = () => {
    setCurrentTime(audio.current.currentTime);
  };

  const playPause = (e: MouseEvent) => {
    e.preventDefault();
    if (!audio.current) {
      console.log('No music is selected yet.');
    } else {
      if (audio.current.paused) {
        audio.current.play();
      } else {
        audio.current.pause();
      }
      setIsPlaying(!audio.current.paused);
    }
  };

  useEffect(() => {
    if (init) {
      audio.current.play();
      setIsPlaying(true);
    }
  }, [current?.id]);

  useEffect(() => {
    audio.current.addEventListener('timeupdate', updateProgress);
    setInit(true);
  }, [audio.current]);

  useEffect(() => () => {
    audio.current.removeEventListener('timeupdate', updateProgress);
  }, []);

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

      <audio
        src={`${API_URLS.STREAMER}/${current?.id}`}
        ref={audio}
      />
      <ProgressBar
        duration={Number(current?.duration) ?? 0}
        currentTime={currentTime}
      />

      <section className="controls">
        <IconButton
          icon="rewind"
          className="rewind"
          onClick={prevTrack}
          disabled={!prevTrack || queue.length === 0}
        />
        <IconButton
          icon={isPlaying ? 'pause' : 'play'}
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
