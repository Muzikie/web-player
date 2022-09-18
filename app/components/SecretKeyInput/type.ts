type onChangeValue = {
  value: string;
  isValid: boolean;
}

export interface SecretKeyInputProps {
  onChange: (val: onChangeValue) => void;
}
