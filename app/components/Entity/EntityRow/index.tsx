import React from 'react';
import Wrapper from './Wrapper';
import EntityThumbnail from '../EntityThumbnail';
import Actions from '../Actions';
import { Entity, EntityRowProps, entityThemes, entityMode } from '../types';
import { getEntity } from '../utils';

const Subtitle = ({ data }: EntityRowProps<Entity>) => {
  let subtitle = '-';
  if ('playlistID' in data) {
    subtitle = data.description;
  } else if ('collectionID' in data) {
    // @todo add profile name
    subtitle = data.creatorAddress;
  } else {
    subtitle = data.name;
  }

  return (
    <span className="profileName">{subtitle}</span>
  )
};

const NumberOfAudios = ({ data }: EntityRowProps<Entity>) => {
  if (!('collectionType' in data)) return null;

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

const Fit = ({ data }: EntityRowProps<Entity>) => {
  if (!('fit' in data)) return null;
  return (
    <>
      {
        data.fit.map((item, index) => <span key={index}>,{item}</span>)
      }
    </>
  );
};

const ReleaseYear = ({ data }: EntityRowProps<Entity>) => {
  if (!('collectionType' in data)) return null;

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
              ? null
              : (
                <EntityThumbnail
                  data={data}
                  theme={theme}
                  className="thumbnail"
                />
              )
          }
          <div className="text">
            <h4 className="collectionName">{data.name}</h4>
            <div className='detail'>
              <span><Subtitle data={data} /> <Fit data={data} /></span>
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
