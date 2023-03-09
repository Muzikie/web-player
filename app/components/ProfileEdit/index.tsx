import React from 'react';
import { Input, FileInput } from '~/components/common/Input';

const ProfileEdit = () => {

  return (
    <form className="component profileEdit">
      <fieldset>
        <FileInput
          icon="file"
          name="Upload banner image"
          accept='.png,.jpg,.jpeg'
          multiple={false}
          title="Upload banner image"
          onChange={onChange}
        />
        <FileInput
          icon="file"
          name="Upload avatar image"
          accept='.png,.jpg,.jpeg'
          multiple={false}
          title="Upload avatar image"
          onChange={onChange}
        />
      </fieldset>
    </form>
  )
}

export default ProfileEdit;
