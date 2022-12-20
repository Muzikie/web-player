import React, { useState, ChangeEvent } from 'react';

export const useCreateTrack = () => {
  const [name, setName] = useState<string>('');
  const [releaseYear, setReleaseYear] = useState<string>('');
  const [artistName, setArtistName] = useState<string>('');
  const [collectionID, setCollectionID] = useState<string>('');
  const [genre, setGenre] = useState<number>(0);
  const [file, setFile] = useState<File | null>(null);

  const onChange = (e: ChangeEvent<HTMLInputElement|HTMLSelectElement>) => {
    switch (e.target.name) {
    case 'name':
      setName(e.target.value);
      break;
    case 'releaseYear':
      setReleaseYear(e.target.value);
      break;
    case 'artistName':
      setArtistName(e.target.value);
      break;
    case 'collectionID':
      setCollectionID(e.target.value);
      break;
    case 'file':
      setFile(e.target.files?.[0] ?? null);
      break;
    case 'genre':
      setGenre(Number(e.target.value));
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
    name,
    releaseYear,
    artistName,
    file,
    genre,
    collectionID,
    onChange,
    broadcast,
  };
};
