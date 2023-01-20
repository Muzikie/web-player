import React from 'react';

import { ValidationStatus, useCreateCollection } from '~/hooks/useCreateEntity';
import { Input, FileInput } from '~/components/common/Input';
import { PrimaryButton } from '~/components/common/Button';
import { Select } from '~/components/common/Select';
import { VALID_COLLECTION_TYPES } from '~/configs';
import Feedback from './Feedback';

const CreateCollection = () => {
  const {
    name,
    releaseYear,
    artistName,
    collectionType,
    onChange,
    broadcast,
    feedback,
    status,
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
        <Input
          value={artistName}
          onChange={onChange}
          name="artistName"
          placeholder="Enter artist name"
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
        onClick={broadcast}
        disabled={status !== ValidationStatus.valid}
        type="button"
      >
        Create
      </PrimaryButton>
      <Feedback data={feedback} />
    </form>
  );
};

export default CreateCollection;
