import React from 'react';

import { ValidationStatus, useCreateCollection } from '~/hooks/useCreateEntity';
import { Input, FileInput } from '~/components/common/Input';
import { PrimaryButton } from '~/components/common/Button';
import { Select } from '~/components/common/Select';
import Feedback from '~/components/Feedback';
import { VALID_COLLECTION_TYPES } from '~/configs';

const CreateCollection = () => {
  const {
    name,
    releaseYear,
    collectionType,
    onChange,
    signAndBroadcast,
    formValidity,
    broadcastStatus,
  } = useCreateCollection();

  return (
    <form className="component createCollection">
      <fieldset>
        <Input
          value={name}
          onChange={onChange}
          name="name"
          placeholder="Enter name"
          type="text"
        />
        <Input
          value={releaseYear}
          onChange={onChange}
          name="releaseYear"
          placeholder="Release year"
          type="text"
        />
        <Select
          placeholder="Select a collection type"
          name="collectionType"
          options={VALID_COLLECTION_TYPES}
          value={collectionType}
          onChange={onChange}
        />
        <FileInput
          icon="file"
          name="files"
          accept='.png,.jpg,.jpeg'
          multiple={false}
          title="Upload cover image"
          onChange={onChange}
        />
      </fieldset>
      <PrimaryButton
        onClick={signAndBroadcast}
        disabled={formValidity.status !== ValidationStatus.valid}
        type="button"
      >
        Create
      </PrimaryButton>
      {
        ((formValidity.status === ValidationStatus.invalid) && formValidity.message)
          ? <Feedback data={{ message: formValidity.message, error: true }} />
          : <Feedback data={broadcastStatus} />
      }
    </form>
  );
};

export default CreateCollection;
