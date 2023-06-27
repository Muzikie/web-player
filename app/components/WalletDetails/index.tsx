import React from 'react';
import { WalletAddressProps } from './types';
import CopyButton from '../common/CopyButton';
import { useAccount } from '~/hooks/useAccount/useAccount';
import { fromBaseToken } from '~/helpers/formatters';
import { PrimaryButton } from '~/components/common/Button';

const WalletDetails = ({ showButton = false }: WalletAddressProps) => {
  const { info } = useAccount();
  const availableBalance = info?.token?.length > 0 ? info.token[0].availableBalance : '0';

  const goToTelegram = () => {
    console.log('telegram');
  };

  return (
    <section className="component walletDetails">
      <header className="walletHeader">
        <h3 className="walletAddress">{info.address}</h3>
        <CopyButton text={info.address} />
      </header>
      <div className="balance">
        <span className="balanceTitle">Balance:</span>
        <h2 className="balanceValue">{`${fromBaseToken(availableBalance)} MZK`}</h2>
      </div>
      <footer className='walletFooter'>
        {
          showButton ?
            <PrimaryButton
              className='registerButton'
              theme="white"
              onClick={goToTelegram}
            >
              Get Free Token
            </PrimaryButton> :
            null
        }
      </footer>

    </section>
  );
};

export default WalletDetails;
