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
    subtitle = 'Artist';
  }

  return (
    <span className="artistName">{subtitle}</span>
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
            <h4 className="albumName">{ data.name }</h4>
            <Subtitle data={data} />
          </div>
        </div>
        <Actions data={data} mode={mode} />
      </div>
    </Wrapper>
  );
};

export default EntityRow;
