import { ReactElement } from 'react';

import { Account } from '~/configs/types';

export interface AccountContextType {
  account: Account;
  isLoggedIn: boolean;
}

export interface AccountProviderProps {
  children: ReactElement;
  passphrase: string;
}

interface Transaction {
  block: {
    id: string;
    height: number;
    timestamp: number;
  };
  executionStatus: 'success' | 'failure';
  id: string;
  nonce: string;
  senderPublicKey: string;
  sender: {
    address: string;
    publicKey: string;
    name: string;
  };
  fee: string;
  minFee: string;
  moduleCommand: string;
  params: Record<string, unknown>;
  signatures: string[];
}

export interface NewTransactionEvent {
  data: Transaction[],
  meta: {
    count: number;
    offset: number;
    total: number;
  }
}