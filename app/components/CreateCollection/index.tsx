import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { useCreateCollection } from '~/hooks/useCreateEntity';
import { Input, FileInput } from '~/components/common/Input';
import { PrimaryButton } from '~/components/common/Button';
import Select from '~/components/common/Select';
import Feedback from '~/components/Feedback';
import { VALID_COLLECTION_TYPES } from '~/configs';
import { collectionSchema } from '~/hooks/useCreateEntity/schemas';

const CreateCollection = () => {
  const { signAndBroadcast, broadcastStatus } = useCreateCollection();

  const { handleSubmit, register, formState } = useForm({
    resolver: yupResolver(collectionSchema),
    mode: 'onBlur', // validate on blur
    shouldFocusError: true, // focus input with error after submit
    defaultValues: {
      name: '',
      releaseYear: '',
      collectionType: '',
      files: null,
      message: '',
    },
  });

  const onSubmit = async (data: Record<string, any>) => {
    await signAndBroadcast(data);
  };
  const errorMessage = (Object.values(formState.errors)[0]?.message as string);
  const formError = errorMessage
    ? {
      message: errorMessage,
      error: true,
    }
    : broadcastStatus;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="component createCollection">
      <fieldset>
        <Input
          {...register('name', { required: true })}
          placeholder="Enter name"
          type="text"
          className={formState.errors.name ? 'error' : ''}
        />
        <Input
          {...register('releaseYear', { required: true })}
          placeholder="Release year"
          type="text"
          className={formState.errors.releaseYear ? 'error' : ''}
        />
        <Select
          {...register('collectionType', { required: true })}
          placeholder="Select a collection type"
          options={VALID_COLLECTION_TYPES}
          className={formState.errors.collectionType ? 'error' : ''}
        />
        <FileInput
          {...register('files', { required: true })}
          icon="file"
          accept=".png,.jpg,.jpeg"
          multiple={false}
          placeholder="Upload cover image"
          className={formState.errors.files ? 'error' : ''}
        />
      </fieldset>
      <PrimaryButton type="submit" disabled={formError.loading || formError.error}>
        <span>{broadcastStatus.loading ? 'loading...' : 'Create'}</span>
      </PrimaryButton>
      <Feedback data={formError} />
    </form>
  );
};

export default CreateCollection;
