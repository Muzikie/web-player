import React from 'react';

/* Internal dependencies */
import { useAccount } from '~/hooks/useAccount/useAccount';
import { fromBaseToken } from '~/helpers/formatters';
import CopyButton from '~/components/common/CopyButton';
import { WalletAddressProps } from './types';

const ViewWallet = ({ address }: WalletAddressProps) => {
  const { account } = useAccount();
  const availableBalance = account.balances?.length > 0 ? account.balances[0].availableBalance : '0';

  return (
    <section className="component viewWallet">
      <header className="walletHeader">
        <h3 className="walletAddress">{account.address}</h3>
        <CopyButton text={account.address} />
      </header>
      <div className="balance">
        <span className="balanceTitle">Balance:</span>
        <h2 className="balanceValue">{`${fromBaseToken(availableBalance)} MZK`}</h2>
      </div>
    </section>
  );
};

export default ViewWallet;
