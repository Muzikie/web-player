/* External dependencies */
import React from 'react';
import {useNavigate} from 'react-router-dom';

/* Internal dependencies */
import {PrimaryButton} from '~/components/common/Button';
import {useAccount} from '~/hooks/useAccount/useAccount';
import {useActiveSubscription} from '~/hooks/useSubscriptions';
// import { SubscriptionStatus } from '../../';

type Props = {};

const LoginPrompt = ({prop}: any) => {
   const navigate = useNavigate();

   const goTo = () => {
      if (prop === 'login') {
         navigate('/login');
      } else if (prop === 'subscribe') {
         navigate('/subscription');
      }
   };

   return (
      <>
         <section className="playingMusic">
            <header>
               <h5>Login before you continue</h5>
               <span>Or sign up and get 2 month free</span>
            </header>
         </section>
         <PrimaryButton className="loginButton" theme="white" onClick={goTo}>
            {prop}
         </PrimaryButton>
      </>
   );
};

export default LoginPrompt;
