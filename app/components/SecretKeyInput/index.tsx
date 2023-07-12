/* External dependencies */
import React from 'react';

/* Internal dependencies */
import { Input } from '~/components/common/Input';

const SecretKeyInput = ({ register }: any) => {
  return (
    <div className="component secretKeyInput">
      <Input
        type="password"
        placeholder="Secret Key"
        icon="key"
        {...register('passphrase', { required: true })}
      />
    </div>
  );
};

export default SecretKeyInput;
