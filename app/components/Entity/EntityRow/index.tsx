import React from 'react';
import Wrapper from './Wrapper';
import EntityThumbnail from '../EntityThumbnail';
import Actions from '../Actions';
import Icon from '~/components/common/Icon';
import { Entity, EntityRowProps, entityThemes, entityMode } from '../types';
import { getEntity } from '../utils';

const Subtitle = ({ data }: EntityRowProps<Entity>) => {
  let subtitle = '-';
  if ('playlistID' in data) {
    subtitle = data.description;
  } else if ('collectionID' in data) {
    subtitle = data.artistName;
  } else {
    subtitle = data.name;
  }

  return (
    <span className="artistName">{subtitle}</span>
  )
};

const NumberOfAudios = ({ data }: EntityRowProps<Entity>) => {
  if (!('audios' in data)) return null;

  let count = 'Single';
  if (data.audios.length > 1) {
    count = data.collectionType === 1 ? `${data.audios.length} songs` : `${data.audios.length} episodes`;
  }


  return (
    <span className="audioCount">
      <strong>.</strong>
      <span>{count}</span>
    </span>
  )
}

const CoArtists = ({ data }: EntityRowProps<Entity>) => {
  if (!('coArtists' in data)) return null;
  return (
    <>
      {
        data.coArtists.map((item, index) => <span key={index}>,{item}</span>)
      }
    </>
  );
};

const ReleaseYear = ({ data }: EntityRowProps<Entity>) => {
  if (!('releaseYear' in data)) return null;

  return (
    <span className="releaseYear">
      {data.releaseYear}
    </span>
  )
};

const EntityRow = ({
  data, className = '', theme = entityThemes.normal, mode = entityMode.view,
}: EntityRowProps<Entity>) => {
  const entity = getEntity(data);

  return (
    <Wrapper
      entity={entity}
      data={data}
      mode={mode}
      className={`component entity row ${entity} ${theme} ${className}`}
    >
      <div className="container">
        <div className="primaryInfo">
          {
            ('audioID' in data)
              ? (<Icon name="play" />)
              : (
                <EntityThumbnail
                  data={data}
                  theme={theme}
                  className="thumbnail"
                />
              )
          }
          <div className="text">
            <h4 className="albumName">{data.name}</h4>
            <div className='detail'>
              <span><Subtitle data={data} /> <CoArtists data={data} /></span>
              <span><ReleaseYear data={data}/> <NumberOfAudios data={data} /></span>
            </div>
          </div>
        </div>
        <Actions data={data} mode={mode} />
      </div>
    </Wrapper>
  );
};

export default EntityRow;
