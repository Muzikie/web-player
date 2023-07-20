import React, { useState, useEffect, useCallback } from 'react';
import io from 'socket.io-client';

import AccountContext from './accountContext';
import { AccountProviderProps } from './types';
import { API_URLS, Account } from '~/configs';
import { extractCredentials } from '~/helpers/cryptography';
import { getAuth, getTokenBalances } from '~/models/entity.client';

const AccountProvider = ({ passphrase, children }: AccountProviderProps) => {
  const [account, setAccount] = useState<Account>({} as Account);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(passphrase?.length > 0);

  const update = useCallback(async () => {
    // Fetch data
    const authData = await getAuth({ params: { address: account.address } });
    const { data: balanceData } = await getTokenBalances({ params: { address: account.address } });

    // Prepare the new value
    const newValue = {
      ...account,
      auth: authData,
    };
    if (balanceData.length) newValue.balances = balanceData;

    // Update the value
    setAccount(newValue);
  }, []);

  const signIn = useCallback(async (passphrase: string) => {
    setIsLoggedIn(passphrase.length > 0);
    const { address, publicKey, privateKey } = await extractCredentials(passphrase);
    const auth = await getAuth({ params: { address } });
    const { data: balances } = await getTokenBalances({ params: { address } });

    setAccount({
      passphrase,
      privateKey,
      address,
      publicKey,
      auth,
      balances,
    });

  }, []);

  // Connect to WebSocket
  useEffect(() => {
    const connection = io(`${API_URLS.STREAMER}/blockchain`, {
      transports: ['websocket'],
    });

    connection.on('new.transaction', (transaction) => {
      if (transaction.senderPublicKey === account ||
        transaction.params.recipientAddress === account.address) {
        update();
      }
    });
  }, []);

  useEffect(() => {
    console.log('AccountProvider passphrase', passphrase);
    if (passphrase) signIn(passphrase);
  }, [passphrase]);

  const value = { account, isLoggedIn };

  return (
    <AccountContext.Provider value={value}>
      {children}
    </AccountContext.Provider>
  );
};

export default AccountProvider;
