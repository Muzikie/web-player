import React from 'react';
import { WalletAddressProps } from './types';
import CopyButton from '../common/CopyButton';
import { useAccount } from '~/hooks/useAccount/useAccount';
import { fromBaseToken } from '~/helpers/formatters';

const WalletDetails = ({ address }: WalletAddressProps) => {
  const { info } = useAccount();
  const availableBalance = info?.token?.length > 0 ? info.token[0].availableBalance : '0';

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
    </section>
  );
};

export default WalletDetails;
