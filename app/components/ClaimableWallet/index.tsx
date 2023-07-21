import React, { useState } from 'react';
import BigNumber from 'bignumber.js';

/* Internal dependencies */
import { MODULES, COMMANDS } from '~/configs';
import { useBroadcast } from '~/hooks/useBroadcast/useBroadcast';
import { useAccount } from '~/hooks/useAccount/useAccount';
import { fromBaseToken } from '~/helpers/formatters';
import CopyButton from '~/components/common/CopyButton';
import { PrimaryButton } from '~/components/common/Button';
import Feedback from '~/components/Feedback';
import { WalletAddressProps } from './types';

/**
 * This component should be only used for the signed in user's wallet.
 */
const ClaimableWallet = ({ address, audios }: WalletAddressProps) => {
  const { account } = useAccount();
  const { broadcast } = useBroadcast();
  const [status, setStatus] = useState({ error: false, message: '' });
  const availableBalance = account.balances?.length > 0 ? account.balances[0].availableBalance : '0';

  const unclaimed = audios.reduce((total, item) => {
    const me = item.owners.find(owner => owner.address === address);
    total = total.plus(BigNumber(me?.income ?? 0));
    return total;
  }, BigNumber(0));

  const claim = async () => {
    const result = await broadcast({
      module: MODULES.AUDIO,
      command: COMMANDS.RECLAIM,
      params: {
        id: Buffer.alloc(0),
      },
      account,
    });

    if (!result.error) {
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
    <section className="component claimableWallet">
      <header className="walletHeader">
        <h3 className="walletAddress">{address}</h3>
        <CopyButton text={address} />
      </header>
      <div className="balance">
        <span className="balanceTitle">Balance:</span>
        <h2 className="balanceValue">{`${fromBaseToken(availableBalance)} MZK`}</h2>
      </div>
      <div className="balance claim">
        <span className="balanceTitle">Unclaimed income:</span>
        <h2 className="balanceValue">{`${fromBaseToken(unclaimed.toString())} MZK`}</h2>
      </div>
      <PrimaryButton disabled={unclaimed.isEqualTo(BigNumber(0))} onClick={claim}>
        Claim
      </PrimaryButton>
      <Feedback data={status} /> 
    </section>
  );
};

export default ClaimableWallet;
