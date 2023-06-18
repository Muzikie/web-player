import { ChangeEvent } from 'react';

export interface AgreementFormProps {
  terms: {
    value: boolean[];
    isValid: boolean;
  };
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export interface AgreementInfoProps {
  disabled: boolean;
}
