import React from 'react';
import { IconButton } from '~/components/common/Button';
import { Profile, API_URLS, FILES } from '~/configs';
import { EntityRowProps } from '~/components/Entity/types';

const ProfileSummary = ({ data }: EntityRowProps<Profile>) => (
  <section className="component profileSummary">
    <header>
      <h1>{ data.nickName } . { data.name }</h1>
      <h4 className="releaseDate">{ data.description }</h4>
      <div className="actionButtons">
        <IconButton
          icon="play"
          theme="primary medium"
          className="play"
          onClick={() => { console.log('Create the play logic'); }}
        />
        <IconButton
          icon="heart"
          theme="outlined small"
          className="follow"
          onClick={(e) => { console.log('Create the follow logic', e); }}
        />
      </div>
    </header>
    <figure className="photo">
      <img src={`${API_URLS.STREAMER}/${data.profileID}-${FILES.profile}.jpg`} alt={ data.name } />
    </figure>
  </section>
);

export default ProfileSummary;
