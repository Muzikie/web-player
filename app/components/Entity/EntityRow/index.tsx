import React from 'react';
import Wrapper from './Wrapper';
import EntityThumbnail from '../EntityThumbnail';
import Fit from './Fit';
import NumberOfAudios from './NumberOfAudios';
import Subtitle from './Subtitle';
import ReleaseYear from './ReleaseYear';
import Actions from '../Actions';
import { Entity, EntityRowProps, entityMode, entityThemes } from '../types';
import { getEntity } from '../utils';

const EntityRow = ({
  data, className = '', mode = entityMode.view, theme = entityThemes.ProfilePage, rowNumber, showRowNumber
}: EntityRowProps<Entity>) => {
  const entity = getEntity(data);

  return (
    <Wrapper
      entity={entity}
      data={data}
      mode={mode}
      className={`component entity row ${entity} ${className}`}
    >
      <div className="container">
        <div className="primaryInfo">
          {showRowNumber && theme === entityThemes.ProfilePage ? <span className='rowNumber'>{rowNumber}<strong>.</strong></span> : null}
          {theme === entityThemes.CollectionPage && entity === 'audio' ? null :
            (<EntityThumbnail
              data={data}
              className="thumbnail"
            />)
          }
          <div className="text">
            <h4 className="collectionName">{data.name}</h4>
            <div className='detail'>
              {theme === entityThemes.ProfilePage ?
                null :
                (<span><Subtitle data={data} /> <Fit data={data} /></span>)
              }
              <span>
                {theme === entityThemes.ProfilePage ?
                  <ReleaseYear data={data} /> :
                  null
                }
                <NumberOfAudios data={data} />
              </span>
            </div>
          </div>
        </div>
        <Actions data={data} mode={mode} />
      </div>
    </Wrapper>
  );
};

export default EntityRow;
