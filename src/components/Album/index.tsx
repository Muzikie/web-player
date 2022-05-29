import React from 'react';
import './album.css';

interface AlbumProps {
  data: {
    name: string;
    file: any;
  }
}

const Album = ({ data }: AlbumProps) => (
  <a>
    <img src={data.file} alt={data.name} />
  </a>
);

export default Album;
