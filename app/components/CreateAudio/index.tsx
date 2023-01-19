import React from 'react';

/* Internal dependencies */
import { useCreateTrack, ValidationStatus } from '~/hooks/useCreateEntity';
import { useUserDiscography } from '~/hooks/useUserDiscography/useUserDiscography';
import { Input, FileInput } from '~/components/common/Input';
import { PrimaryButton } from '~/components/common/Button';
import { Select } from '~/components/common/Select';
import { Link } from '~/components/common/Link';
import { VALID_GENRES } from '~/constants/app';
import Feedback from './Feedback';

const CreateAudio = () => {
  const {
    name,
    releaseYear,
    artistName,
    genre,
    collectionID,
    status,
    onChange,
    broadcast,
    feedback,
  } = useCreateTrack();
  const { albums } = useUserDiscography();

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
        <div className='collectionRow'>
          <Select
            placeholder="Select a collection (Album)"
            name="collectionID"
            options={albums}
            value={collectionID}
            onChange={onChange}
          />
          <Link
            to="/profile/createAlbum"
            icon="cross"
            className='addCollection'
          />
        </div>
        <Select
          placeholder="Select a genre"
          name="genre"
          options={VALID_GENRES}
          value={genre}
          onChange={onChange}
        />
        <FileInput
          icon="file"
          name="files"
          accept='.mp3,.wav'
          multiple={false}
          title="Upload MP3"
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

export default CreateAudio;
