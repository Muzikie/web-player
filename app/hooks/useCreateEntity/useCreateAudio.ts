/* External dependencies */
import { useState, ChangeEvent, useEffect } from 'react';
import { cryptography } from '@liskhq/lisk-client';

/* Internal dependencies */
import { useAccount } from '~/hooks/useAccount/useAccount';
import {
  MODULES,
  COMMANDS,
} from '~/configs';
import { ValidationStatus, ValidationResult } from './types';
import { validate } from './validator';
import { bufferize } from '~/helpers/convertors';
import { useBroadcast } from '../useBroadcast/useBroadcast';

export const useCreateAudio = () => {
  const { updateAccount } = useAccount();
  const { broadcast } = useBroadcast();

  const [formValidity, setFormValidity] = useState<ValidationResult>({
    status: ValidationStatus.clean
  });
  const [name, setName] = useState<string>('');
  const [releaseYear, setReleaseYear] = useState<string>('');
  const [collectionID, setCollectionID] = useState<string>('');
  const [genre, setGenre] = useState<number>(-1);
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
    case 'collectionID':
      setCollectionID(e.target.value);
      break;
    case 'files':
      setFiles(e.target.files ?? null);
      break;
    case 'genre':
      setGenre(Number(e.target.value));
      break;
    default:
      break;
    }
  };

  const signAndBroadcast = async () => {
    const data = await updateAccount();
    const result = await broadcast({
      module: MODULES.AUDIO,
      command: COMMANDS.CREATE,
      params: {
        name,
        releaseYear,
        fit: [],
        genre: [genre],
        collectionID: bufferize(collectionID),
        owners: [{
          address: cryptography.address.getAddressFromLisk32Address(data.address),
          shares: 100
        }]
      },
      account: data,
      files: [{ key: 'audio', value: files[0] }],
    });
    setBroadcastStatus(result);
  };

  useEffect(() => {
    validate('audio', {
      name,
      releaseYear,
      fit: [],
      files,
      genre: [genre],
      collectionID,
    }).then((result: ValidationResult) => {
      if(formIsChanged){
        setFormValidity(result);
      }
    });
  }, [
    name,
    releaseYear,
    files,
    genre,
    collectionID,
  ]);

  return {
    name,
    releaseYear,
    files,
    genre,
    collectionID,
    onChange,
    signAndBroadcast,
    formValidity,
    broadcastStatus,
  };
};
