import React from 'react';
import Wrapper from './Wrapper';
import EntityThumbnail from '../EntityThumbnail';
import Actions from '../Actions';
import { Entity, EntityRowProps, entityThemes } from '../types';
import { getEntity } from '../utils';

const Subtitle = ({ data }: EntityRowProps<Entity>) => {
  let subtitle = '-';
  if ('creationDate' in data) {
    subtitle = 'Lana Del Rey and others';
  } else if ('releaseDate' in data || 'duration' in data) {
    subtitle = data.artistName;
  } else {
    subtitle = `${data.albums.length} Albums`;
  }

  return (
    <span className="artistName">{subtitle}</span>
  )
};

const EntityRow = ({
  data, className = '', theme = entityThemes.normal,
}: EntityRowProps<Entity>) => {
  const entity = getEntity(data);

  return (
    <Wrapper
      entity={entity}
      data={data}
      className={`component entity row ${entity} ${theme} ${className}`}
    >
      <div className="container">
        <div className="primaryInfo">
          {
            ('duration' in data) ? null : (
              <EntityThumbnail
                data={data}
                theme={theme}
                className="thumbnail"
              />
            )
          }
          <div className="text">
            <h4 className="albumName">{ data.name }</h4>
            <Subtitle data={data} />
          </div>
        </div>
        <Actions data={data} />
      </div>
    </Wrapper>
  );
};

export default EntityRow;
