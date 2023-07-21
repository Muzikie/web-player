/* External dependencies */
import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';

/* Internal dependencies */
import { PlayerContext } from '~/context/playerContext/playerContextProvider';
import Modal from '~/components/Modal';
import PlayerContent from './PlayerContent';
import Feedback from './Feedback';
import { useAccount } from '~/hooks/useAccount/useAccount';
import { PlayerState } from './types';

const Player = () => {
  const { current } = useContext(PlayerContext);
  const location = useLocation();
  const { isLoggedIn, account } = useAccount();

  const isSubscribe = !!account.subscription;

  const isAuthPath = ['/registered', '/login'].includes(location.pathname);

  return (
    <Modal className={`component player ${current && !isAuthPath ? 'visible' : ''}`}>
      {
        isLoggedIn && isSubscribe
          ? (
            <PlayerContent />
          )
          : (
            <Feedback
              type={ !isLoggedIn ? PlayerState.loginError : PlayerState.subscriptionError }
            />
          )
      }
    </Modal>
  );
};

export default Player;
