import { ReactNode } from 'react';

export interface PartialViewProps {
  title: string;
  form: ReactNode;
  actionAndInfo: ReactNode;
  className?: string;
}
