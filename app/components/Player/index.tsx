/* External dependencies */
import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';

/* Internal dependencies */
import { PlayerContext } from '~/context/playerContext/playerContextProvider';
import Modal from '~/components/Modal';
import PlayerContent from './PlayerContent';
import LoginPrompt from './LoginPrompt';
import { useAccount } from '~/hooks/useAccount/useAccount';
import { useActiveSubscription } from '~/hooks/useSubscriptions';
import { SubscriptionStatus } from '~/hooks/useSubscriptions/types';
import { PlayerState } from './types';

const Player = () => {
  const { current } = useContext(PlayerContext);
  const location = useLocation();
  const { info } = useAccount();
  const { subscriptionStatus } = useActiveSubscription();

  const isSubscribe = subscriptionStatus === SubscriptionStatus.subscribed;
  const isLogin = !!info.address;

  const isAuthPath = ['/registered', '/login'].includes(location.pathname);

  return (
    <Modal className={`component player ${current && !isAuthPath ? 'visible' : ''}`}>
      {
        isLogin && isSubscribe
          ? (
            <PlayerContent />
          )
          : (
            <LoginPrompt
              type={ !isLogin ? PlayerState.loginError : PlayerState.subscriptionError }
            />
          )
      }
    </Modal>
  );
};

export default Player;
