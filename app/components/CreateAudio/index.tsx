import React from 'react';

import { useCreateTrack } from '~/hooks/useCreateEntity';
import { useUserDiscography } from '~/hooks/useUserDiscography/useUserDiscography';
import { Input, FileInput } from '~/components/common/Input';
import { PrimaryButton } from '~/components/common/Button';
import { Select } from '~/components/common/Select';
import { VALID_GENRES } from '~/constants/app';
import Feedback from './Feedback';

const CreateAudio = () => {
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
  const { albums } = useUserDiscography();

  // @todo improve validation
  const disabled = !name || !releaseYear || !artistName || !genre || !collectionID;

  return (
    <form className="component createAudio">
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
          placeholder="Select a collection (Album)"
          name="collectionID"
          options={albums}
          value={collectionID}
          onChange={onChange}
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
        disabled={disabled}
        type="button"
      >
        Create
      </PrimaryButton>
      <Feedback data={feedback} />
    </form>
  );
};

export default CreateAudio;
