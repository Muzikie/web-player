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
  } else if ('audioID' in data) {
    subtitle = data.artistName;
  } else {
    subtitle = data.artistName;
  }

  return (
    <span className="artistName">{subtitle}</span>
  )
};

const NumberOfAudios = ({ data }: EntityRowProps<Entity>) => {
  console.log('data', data);
  let count = '';
  if (data.collectionType === 1) {
    if (data.audios.length > 1) {
      count = `${data.audios.length} songs`;
    } else {
      count = 'single';
    }
  } else if (data.collectionType === 2) {
    count = 'episodes'
  } else {
    count = '';
  }
  return (
    <span> ․ {count}</span>
  )
}

const CoArtists = ({ data }: EntityRowProps<Entity>) => {
  if (data.coArtists) {
    data.coArtists.map((items, index) => <span key={index}>,{item}</span>)
  }

}


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
              <span>{data.releaseYear} <NumberOfAudios data={data} /></span>
            </div>
          </div>
        </div>
        <Actions data={data} mode={mode} />
      </div>
    </Wrapper>
  );
};

export default EntityRow;
