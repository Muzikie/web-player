import React from 'react';
// import { formatThousands } from '~/helpers/formatters';
import { secondToMinutes } from '~/helpers/convertors';
import { IconButton } from '~/components/common/Button';
import { AudioType, EntityRowProps } from '../types';

const AudioActions = ({ data }: EntityRowProps<AudioType>) => (
  <footer className="component entity action audio">
    <IconButton
      icon="heart"
      className="likeButton"
      onClick={() => console.log('Implement like functionality', data)}
    />
    {/* <span className="streamCount">{ formatThousands(Number(data.likes)) }</span>*/}
    <span className="duration">{secondToMinutes(Number(data.duration = 0))}</span>
    <IconButton
      icon="more-vertical"
      className="contextMenu"
      onClick={() => console.log('Implement context menu functionality', data)}
    />
  </footer>
);

export default AudioActions;
