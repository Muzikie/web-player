import React from 'react';
import { WalletAddressProps } from './types';
import CopyButton from '../common/CopyButton';

const WalletDetails = ({ address }: WalletAddressProps) => {
  //{info.balances && info.balances.length === 0 ? 0 : info.balances[0].availableBalance}

  return (
    <section className="component walletDetails">
      <header className='walletHeader'>
        <span className='walletAddress'>{address}</span>
        <CopyButton text={address} />
      </header>
      <div className='balance'>
        <span className='balanceTitle'>balance:</span>
        <span className='balanceValue'>0 MZK</span>
      </div>
    </section>
  );
};

export default WalletDetails;
