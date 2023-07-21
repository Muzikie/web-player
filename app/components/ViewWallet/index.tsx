import React from 'react';

/* Internal dependencies */
import { fromBaseToken } from '~/helpers/formatters';
import CopyButton from '~/components/common/CopyButton';
import { WalletAddressProps } from './types';

const ViewWallet = ({ address, balances }: WalletAddressProps) => {
  const availableBalance = balances?.length > 0 ? balances[0].availableBalance : '0';

  return (
    <section className="component viewWallet">
      <header className="walletHeader">
        <h3 className="walletAddress">{address}</h3>
        <CopyButton text={address} />
      </header>
      <div className="balance">
        <span className="balanceTitle">Balance:</span>
        <h2 className="balanceValue">{`${fromBaseToken(availableBalance)} MZK`}</h2>
      </div>
    </section>
  );
};

export default ViewWallet;
