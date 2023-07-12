import React from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { audioSchema } from '~/hooks/useCreateEntity/schemas';
import { useForm } from 'react-hook-form';

/* Internal dependencies */
import { useCreateAudio } from '~/hooks/useCreateEntity';
import { Input, FileInput } from '~/components/common/Input';
import { PrimaryButton } from '~/components/common/Button';
import Select from '~/components/common/Select';
import { Link } from '~/components/common/Link';
import Feedback from '~/components/Feedback';
import { ROUTES } from '~/routes/routes';
import { VALID_GENRES } from '~/configs';
import { CollectionInfo } from './types';

const CreateAudio = ({ CollectionInfo }: CollectionInfo) => {
  const { signAndBroadcast, broadcastStatus } = useCreateAudio();
  const { handleSubmit, register, formState } = useForm({
    resolver: yupResolver(audioSchema),
    mode: 'onBlur', // validate on blur
    shouldFocusError: true, // focus input with error after submit
    defaultValues: {
      name: '',
      releaseYear: '',
      collectionID: '',
      genre: 0,
      files: null,
      message: '',
    },
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
            to={ROUTES.UPLOAD_COLLECTION}
            icon="cross"
            className='addCollection'
          />
        </div>
        <Select
          {...register('genre', { required: true })}
          placeholder="Select a genre"
          options={VALID_GENRES}
        />
        <FileInput
          {...register('files', { required: true })}
          icon="file"
          accept=".mp3,.wav"
          multiple={false}
          placeholder="Upload MP3"
        />
      </fieldset>
      <PrimaryButton type="submit">
        <span>{broadcastStatus.loading ? 'loading...' : 'Create'}</span>
      </PrimaryButton>
      <Feedback data={formError} />
    </form>
  );
};

export default CreateAudio;
