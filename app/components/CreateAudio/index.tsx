import React from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, useFieldArray } from 'react-hook-form';

/* Internal dependencies */
import { useCreateAudio } from '~/hooks/useCreateEntity';
import { audioSchema } from '~/hooks/useCreateEntity/schemas';
import { Input, FileInput } from '~/components/common/Input';
import { IconButton, PrimaryButton } from '~/components/common/Button';
import Select from '~/components/common/Select';
import { Link } from '~/components/common/Link';
import Feedback from '~/components/Feedback';
import { ROUTES } from '~/routes/routes';
import { VALID_GENRES } from '~/configs';
import { CollectionInfo } from './types';

const CreateAudio = ({ CollectionInfo, creatorAddress }: CollectionInfo) => {
  const { signAndBroadcast, broadcastStatus } = useCreateAudio();
  const { handleSubmit, register, formState, control } = useForm({
    resolver: yupResolver(audioSchema),
    mode: 'onBlur', // validate on blur
    shouldFocusError: true, // focus input with error after submit
    defaultValues: {
      name: '',
      releaseYear: '',
      collectionID: '',
      genre: 0,
      files: null,
      owners: [{
        address: creatorAddress,
        shares: 100,
      }],
      message: '',
    },
  });
  const { fields, remove, append } = useFieldArray({
    control,
    rules: { minLength: 1 },
    name: 'owners',
  });

  const CollectionsInfo = CollectionInfo.map((item) => ({
    value: item.collectionID,
    label: `${item.name} - ${item.releaseYear}`,
  }));

  const onSubmit = async (data: Record<string, any>) => {
    await signAndBroadcast(data);
  };

  const errorMessage = formState.errors && (Object.values(formState.errors)[0]?.message as string);
  const formError = errorMessage
    ? {
      message: errorMessage,
      error: true,
    }
    : broadcastStatus;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="component createAudio">
      <fieldset>
        <Input
          {...register('name', { required: true })}
          placeholder="Enter name"
          type="text"
        />
        <Input
          {...register('releaseYear', { required: true })}
          placeholder="Release year"
          type="text"
        />
        <div className="collectionRow">
          <Select
            {...register('collectionID', { required: true })}
            placeholder="Select a collection (Collection)"
            options={CollectionsInfo}
          />
          <Link
            to={ROUTES.UPLOAD_COLLECTION.location}
            icon="cross"
            className='addCollection'
          />
        </div>
        <Select
          {...register('genre', { required: true })}
          placeholder="Select a genre"
          options={VALID_GENRES}
        />
        <fieldset className="royaltyOwners">
          <legend>
            <span>Royalty owners</span>
            <IconButton
              icon="cross"
              className="addButton"
              onClick={() => append({ address: '', shares: 0 })}
            />
          </legend>
          {
            fields.map(({ address }, index: number) => (
              <fieldset key={address + index} className="ownerItem">
                <Input
                  className="input"
                  placeholder="Owner's wallet address"
                  type="text"
                  {...register(`owners.${index}.address`, { required: false })} 
                />
                <Input
                  className="input"
                  placeholder="Owner's royalty shares (%)"
                  type="text"
                  {...register(`owners.${index}.shares`, { required: false })} 
                />
                <IconButton
                  icon="trash"
                  className="removeButton"
                  onClick={() => { remove(index); }}
                />
              </fieldset>
            ))
          }
        </fieldset>
        <FileInput
          {...register('files', { required: true })}
          icon="file"
          accept=".mp3,.wav"
          multiple={false}
          placeholder="Upload MP3"
        />
      </fieldset>
      <PrimaryButton type="submit" disabled={formError.loading || formError.error}>
        <span>{broadcastStatus.loading ? 'loading...' : 'Create'}</span>
      </PrimaryButton>
      <Feedback data={formError} />
    </form>
  );
};

export default CreateAudio;
