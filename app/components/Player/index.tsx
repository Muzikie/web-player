/* External dependencies */
import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';

/* Internal dependencies */
import { PlayerContext } from '~/context/playerContext/playerContextProvider';
import { ProfileContext } from '~/context/profileContext/profileContextProvider';
import Modal from '~/components/Modal';
import PlayerContent from './PlayerContent';
import LoginPrompt from './LoginPrompt';

const Player = () => {
  const { current } = useContext(PlayerContext);
  const location = useLocation();
  const { info } = useContext(ProfileContext);

  const isAuthPath = ['/registered', '/login'].includes(location.pathname);

  return (
    <Modal className={`component player ${current && !isAuthPath ? 'visible' : ''}`}>
      {
        info.address
          ? <PlayerContent />
          : <LoginPrompt />
      }
    </Modal>
  );
}

export default Player;
