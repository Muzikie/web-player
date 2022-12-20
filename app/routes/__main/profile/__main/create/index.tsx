import React from 'react';

import { useCreateTrack } from '~/hooks/useCreateEntity';
import { Input, FileInput } from '~/components/common/Input';
import { PrimaryButton } from '~/components/common/Button';
import { Select } from '~/components/common/Select';

const Create = () => {
  const {
    title,
    lyrics,
    artist,
    genre,
    onChange,
    broadcast,
  } = useCreateTrack();

  return (
    <section className="screen create tabContainer">
      <form>
        <fieldset>
          <Input
            value={title}
            onChange={onChange}
            name="title"
            placeholder="Enter title"
            type="text"
          />
          <Input
            value={lyrics}
            onChange={onChange}
            name="lyrics"
            placeholder="Enter lyrics"
            type="text"
          />
          <Input
            value={artist}
            onChange={onChange}
            name="artist"
            placeholder="Enter artist"
            type="text"
          />
          <Select
            placeholder="Select a genre"
            name="genre"
            options={['pop', 'rock', 'rap', 'jazz']}
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
      </form>
    </section>
  );
};

export default Create;
