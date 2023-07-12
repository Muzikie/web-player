import React, { useState } from 'react';
import BigNumber from 'bignumber.js';

import { MODULES, COMMANDS } from '~/configs';
import { ProfileInfoType } from '~/context/profileContext/types';
import { useBroadcast } from '~/hooks/useBroadcast/useBroadcast';
import { useAccount } from '~/hooks/useAccount/useAccount';
import { fromBaseToken } from '~/helpers/formatters';
import CopyButton from '~/components/common/CopyButton';
import { PrimaryButton } from '~/components/common/Button';
import Feedback from '~/components/Feedback';
import { WalletAddressProps } from './types';

const WalletDetails = ({ address, audios }: WalletAddressProps) => {
  const { info, updateAccount } = useAccount();
  const { broadcast } = useBroadcast();
  const [status, setStatus] = useState({ error: false, message: '' });
  const [account, setAccount] = useState<ProfileInfoType>(info);
  const availableBalance = account?.token?.length > 0 ? account.token[0].availableBalance : '0';

  const unclaimed = audios.reduce((total, item) => {
    const me = item.owners.find(owner => owner.address === address);
    total = total.plus(BigNumber(me?.income ?? 0));
    return total;
  }, BigNumber(0));

  const claim = async () => {
    let updatedAccount = await updateAccount();
    setAccount(updatedAccount);
    const result = await broadcast({
      module: MODULES.AUDIO,
      command: COMMANDS.RECLAIM,
      params: {
        id: Buffer.alloc(0),
      },
      account: updatedAccount,
    });

    if (!result.error) {
      updatedAccount = await updateAccount();
      setAccount(updatedAccount);
      setStatus({
        error: false,
        message: 'Successfully reclaimed your income. It takes a few seconds to reflect on your account.',
      });
    } else {
      setStatus({
        error: true,
        message: 'Error reclaiming your income, try again.',
      });
    }
  };

  return (
    <section className="component walletDetails">
      <header className="walletHeader">
        <h3 className="walletAddress">{address}</h3>
        <CopyButton text={address} />
      </header>
      <div className="balance">
        <span className="balanceTitle">Balance:</span>
        <h2 className="balanceValue">{`${fromBaseToken(availableBalance)} MZK`}</h2>
      </div>
      {
        account.address === address && (
          <>
            <div className="balance claim">
              <span className="balanceTitle">Unclaimed income:</span>
              <h2 className="balanceValue">{`${fromBaseToken(unclaimed.toString())} MZK`}</h2>
            </div>
            <PrimaryButton disabled={unclaimed.isEqualTo(BigNumber(0))} onClick={claim}>
              Claim
            </PrimaryButton>
            <Feedback data={status} /> 
          </>
        )
      }
    </section>
  );
};

export default WalletDetails;
