/* External dependencies */
import React, { useState, ChangeEvent } from 'react';

/* Internal dependencies */
import { Input } from '~/components/common/Input';
import { validateSecretKey } from '~/helpers/validators';
import { SecretKeyInputProps } from './type';

const SecretKeyInput = ({ register }: any) => {
  return (
    <div className='component secretKeyInput'>
      <Input
        type='password'
        placeholder='Secret Key'
        icon='key'
        name='passphrase'
        register={register}
      />
    </div>
  );
};

export default SecretKeyInput;
