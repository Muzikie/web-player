import React from 'react';
import Header from '../../components/Header';
import Player from '../../components/Player';
import RecentsSidebar from '../../components/RecentsSidebar';
import UserCollections from '../../components/UserCollections';
import ArtistFull from '../../components/ArtistFull';

const Artist = () => {
  return (
    <div className="wrapper expand">
      <div className="expand">
        <Header />
      </div>
      <main className="main">
        <UserCollections />
        <ArtistFull />
        <RecentsSidebar />
      </main>
      <Player />
    </div>
  );
}

export default Artist;
