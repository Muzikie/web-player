/* External dependencies */
import { useState, ChangeEvent, useEffect } from 'react';
import { cryptography } from '@liskhq/lisk-client';

/* Internal dependencies */
import { useAccount } from '~/hooks/useAccount/useAccount';
import { MODULES, COMMANDS } from '~/configs';
import { ValidationStatus, ValidationResult } from './types';
import { validate } from './validator';

import { useBroadcast } from './useBroadcast'

export const useCreateCollection = () => {
  const { updateAccount } = useAccount();
  const { broadcast } = useBroadcast();

  const [formValidity, setFormValidity] = useState<ValidationResult>({
    status: ValidationStatus.clean
  });
  const [name, setName] = useState<string>('');
  const [releaseYear, setReleaseYear] = useState<string>('');
  const [collectionType, setCollectionType] = useState<number>(-1);
  const [files, setFiles] = useState<FileList | null>(null);
  const [broadcastStatus, setBroadcastStatus] = useState({ error: false, message: '' });
  const [formIsChanged, setFormIsChanged] = useState(false);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    if(!formIsChanged) setFormIsChanged(true);
    switch (e.target.name) {
    case 'name':
      setName(e.target.value);
      break;
    case 'releaseYear':
      setReleaseYear(e.target.value);
      break;
    case 'collectionType':
      setCollectionType(Number(e.target.value));
      break;
    case 'files':
      setFiles(e.target.files ?? null);
      break;
    default:
      break;
    }
  };

  const signAndBroadcast = async () => {
    const data = await updateAccount();
    const result = await broadcast({
      module: MODULES.COLLECTION,
      command: COMMANDS.CREATE,
      params: {
        name,
        releaseYear,
        collectionType,
        owners: [{
          address: cryptography.address.getAddressFromLisk32Address(data.address),
          shares: 100
        }]
      },
      account: data,
      files: [{ key: 'cover', value: files[0] }],
    });
    setBroadcastStatus(result);
  };

  useEffect(() => {
    validate('collection', {
      name,
      releaseYear,
      collectionType,
      files,
    }).then((result: ValidationResult) => {
      if(formIsChanged){
        setFormValidity(result);
      }
    });
  }, [
    name,
    releaseYear,
    collectionType,
    files,
  ]);

  return {
    name,
    releaseYear,
    collectionType,
    onChange,
    signAndBroadcast,
    formValidity,
    broadcastStatus,
  };
};
