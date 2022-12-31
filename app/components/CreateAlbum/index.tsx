import React from 'react';

import { useCreateAlbum } from '~/hooks/useCreateEntity';
import { Input, FileInput } from '~/components/common/Input';
import { PrimaryButton } from '~/components/common/Button';
import { Select } from '~/components/common/Select';
import { VALID_COLLECTION_TYPES } from '~/constants/app';
import Feedback from './Feedback';

const CreateAlbum = () => {
  const {
    name,
    releaseYear,
    artistName,
    collectionType,
    onChange,
    broadcast,
    feedback,
  } = useCreateAlbum();

  // @todo improve validation
  const disabled = !name || !releaseYear || !artistName || !collectionType;

  return (
    <form className="component createAlbum">
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
          title="Upload cover image"
          onChange={onChange}
        />
      </fieldset>
      <PrimaryButton
        onClick={broadcast}
        disabled={disabled}
        type="button"
      >
        Create
      </PrimaryButton>
      <Feedback data={feedback} />
    </form>
  );
};

export default CreateAlbum;
