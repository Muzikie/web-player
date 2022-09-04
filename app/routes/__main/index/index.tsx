/* External dependencies */
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

/* Internal dependencies */
import {
  getPlaylists,
  getRecentlyPlayed,
  getArtists,
  getAlbums,
} from "~/models/entity.server";
import Collection from '~/components/Collection';
import Logo from '~/components/Logo';
import { greet } from '~/helpers/helpers';
import { entityThemes } from '~/components/Entity/types';
import { collectionThemes } from '~/components/Collection/types';
import styles from "~/styles/routes/__main/index.css";

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}

type LoaderData = {
  playlists: Awaited<ReturnType<typeof getPlaylists>>;
  recentlyPlayed: Awaited<ReturnType<typeof getRecentlyPlayed>>;
  artists: Awaited<ReturnType<typeof getArtists>>;
  albums: Awaited<ReturnType<typeof getAlbums>>;
};

export const loader = async () => {
  return json<LoaderData>({
    playlists: await getPlaylists(),
    recentlyPlayed: await getRecentlyPlayed(),
    artists: await getArtists(),
    albums: await getAlbums(),
  });
};

const Home = () => {
  const {
    playlists,
    recentlyPlayed,
    artists,
    albums,
  } = useLoaderData() as LoaderData;

  return (
    <section className="screen home">
      <header>
        <Logo size="large" />
        <h2>{greet()}</h2>
      </header>
      <Collection
        className="playlists"
        title="Playlists"
        itemTheme={entityThemes.large}
        theme={collectionThemes.normal}
        items={!playlists?.length ? [] : playlists}
      />
      <Collection
        className="recent"
        title="Recent"
        itemTheme={entityThemes.minimal}
        items={!recentlyPlayed?.length ? [] : recentlyPlayed}
      />
      <Collection
        className="favorite"
        title="Favorite"
        itemTheme={entityThemes.minimal}
        items={!artists.length ? [] : artists}
      />
      <Collection
        className="favorite"
        title="Favorite"
        itemTheme={entityThemes.minimal}
        items={!albums.length ? [] : albums}
      />
    </section>
  );
};

export default Home;
