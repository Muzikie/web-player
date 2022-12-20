import React, { useState, ChangeEvent } from 'react';

export const useCreateTrack = () => {
  const [title, setTitle] = useState<string>('');
  const [lyrics, setLyrics] = useState<string>('');
  const [artist, setArtist] = useState<string>('');
  const [genre, setGenre] = useState<string>('');
  const [file, setFile] = useState<File | null>(null);

  const onChange = (e: ChangeEvent<HTMLInputElement|HTMLSelectElement>) => {
    const { name, value, files } = e.target;

    switch (name) {
    case 'title':
      setTitle(value);
      break;
    case 'lyrics':
      setLyrics(value);
      break;
    case 'artist':
      setArtist(value);
      break;
    case 'file':
      setFile(files?.[0] ?? null);
      break;
    case 'genre':
      setGenre(value);
      break;
    default:
      break;
    }
  };

  const broadcast = () => {
    // Create blockchain transaction and broadcast it
    // Check if the NFT is created correctly
    // If successful, make an API call to the server to save the entity
  };

  return {
    title,
    lyrics,
    artist,
    file,
    genre,
    onChange,
    broadcast,
  };
};
