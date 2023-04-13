import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { useCreateCollection } from '~/hooks/useCreateEntity';
import { Input, FileInput } from '~/components/common/Input';
import { PrimaryButton } from '~/components/common/Button';
import { Select } from '~/components/common/Select';
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
  const errorMessage = formState.errors && (Object.values(formState.errors)[0]?.message as string);
  const formError = errorMessage
    ? {
      message: errorMessage,
      error: true,
    }
    : broadcastStatus;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="component createCollection">
      <fieldset>
        <Input register={register} name="name" placeholder="Enter name" type="text" />
        <Input register={register} name="releaseYear" placeholder="Release year" type="text" />
        <Select
          placeholder="Select a collection type"
          name="collectionType"
          options={VALID_COLLECTION_TYPES}
          register={register}
        />
        <FileInput
          icon="file"
          name="files"
          accept=".png,.jpg,.jpeg"
          multiple={false}
          title="Upload cover image"
          register={register}
        />
      </fieldset>
      <PrimaryButton type="submit">
        <>{broadcastStatus.loading ? <span>loading...</span> : <span>Create</span>}</>
      </PrimaryButton>
      <Feedback data={formError} />
    </form>
  );
};

export default CreateCollection;
