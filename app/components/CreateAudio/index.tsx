import React from 'react';

/* Internal dependencies */
import { useCreateAudio, ValidationStatus } from '~/hooks/useCreateEntity';
import { useUserDiscography } from '~/hooks/useUserDiscography/useUserDiscography';
import { Input, FileInput } from '~/components/common/Input';
import { PrimaryButton } from '~/components/common/Button';
import { Select } from '~/components/common/Select';
import { Link } from '~/components/common/Link';
import Feedback from '~/components/Feedback';
import { ROUTES } from '~/routes/routes';
import { VALID_GENRES } from '~/configs';

const CreateAudio = ({ collectionsAudio }: any) => {
  const {
    name,
    releaseYear,
    genre,
    collectionID,
    formValidity,
    onChange,
    signAndBroadcast,
    broadcastStatus,
  } = useCreateAudio();
  const { collections } = useUserDiscography();

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
        <div className='collectionRow'>
          <Select
            placeholder="Select a collection (Collection)"
            name="collectionID"
            options={collectionsAudio}
            value={collectionID}
            onChange={onChange}
          />
          <Link
            to={ROUTES.UPLOAD_COLLECTION}
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

export default CreateAudio;
