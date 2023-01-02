/* External dependencies */
import React from 'react';
import {useNavigate} from 'react-router-dom';

import {PrimaryButton} from '~/components/common/Button';

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
               {prop === 'login' ? (
                  <>
                     <h5>login before you continue</h5>
                     <span>Or sign up and get 2 month free</span>
                  </>
               ) : (
                  <>
                     <h5>you need subscription</h5>
                     <span>to continue listening to music</span>
                  </>
               )}
            </header>
         </section>
         <PrimaryButton className="loginButton" theme="white" onClick={goTo}>
            {prop}
         </PrimaryButton>
      </>
   );
};

export default LoginPrompt;
