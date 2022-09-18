import React, { useState, ChangeEvent } from 'react';
import Input from '~/components/common/Input';
import { validateSecretKey } from '~/helpers/validators';
import { SecretKeyInputProps } from './type';

const SecretKeyInput = ({
  onChange,
}: SecretKeyInputProps) => {
  const [secretKey, setSecretKey] = useState({
    value: '',
    isValid: false,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = {
      value: e.target.value,
      isValid: validateSecretKey(e.target.value)
    };
    setSecretKey(newValue);
    onChange(newValue);
  };

  return (
    <div className="component secretKeyInput">
      <Input
        type="password"
        placeholder="Secret Key"
        icon="key"
        value={secretKey.value}
        message={secretKey.value && !secretKey.isValid ? 'Please enter a valid secret key' : ''}
        onChange={handleChange}
      />
    </div>
  );
};

export default SecretKeyInput;
