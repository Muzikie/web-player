import { ReactNode } from 'react';

export interface ModalProps {
  discardable?: boolean;
  onDiscard?: () => void;
  className?: string;
  children: ReactNode;
}
