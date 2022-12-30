import React from 'react';

import { useCreateTrack } from '~/hooks/useCreateEntity';
import { Input, FileInput } from '~/components/common/Input';
import { PrimaryButton } from '~/components/common/Button';
import { Select } from '~/components/common/Select';
import { VALID_GENRES } from '~/constants/app';
import Feedback from './Feedback';

const Create = () => {
  const {
    name,
    releaseYear,
    artistName,
    genre,
    collectionID,
    onChange,
    broadcast,
    feedback,
  } = useCreateTrack();
  console.log('feedback', feedback);

  return (
    <section className="screen create tabContainer">
      <form>
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
          <Input
            value={collectionID}
            onChange={onChange}
            name="collectionID"
            placeholder="Enter collectionID"
            type="text"
          />
          <Select
            placeholder="Select a genre"
            name="genre"
            options={VALID_GENRES}
            value={genre}
            onChange={onChange}
          />
          <FileInput
            icon="file"
            title="Upload MP3"
            onChange={onChange}
          />
        </fieldset>
        <PrimaryButton
          onClick={broadcast}
          type="button"
        >
          Create
        </PrimaryButton>
        <Feedback data={feedback} />
      </form>
    </section>
  );
};

export default Create;
