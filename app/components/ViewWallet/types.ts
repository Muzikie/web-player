import type { Balance } from '~/configs';

export interface WalletAddressProps {
  address: string;
  balances: Balance[];
}
