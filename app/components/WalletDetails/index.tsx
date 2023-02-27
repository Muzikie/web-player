import React from 'react';
import { WalletAddressProps } from './types';
import CopyButton from '../common/CopyButton';

const WalletDetails = ({ address }: WalletAddressProps) => {
  // {info.balances && info.balances.length === 0 ? 0 : info.balances[0].availableBalance}

  return (
    <section className="component walletDetails">
      <header className="walletHeader">
        <h3 className="walletAddress">{address}</h3>
        <CopyButton text={address} />
      </header>
      <div className="balance">
        <span className="balanceTitle">Balance:</span>
        <h2 className="balanceValue">0 MZK</h2>
      </div>
    </section>
  );
};

export default WalletDetails;
