import React from 'react';
import './album.css';

interface AlbumProps {
  name: string;
}

const Album = ({ name }: AlbumProps) => (
  <a>
    <img src={`../../assets/images/mocks/${name}.png`} alt={name} />
  </a>
);

export default Album;
