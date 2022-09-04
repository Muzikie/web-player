/* External dependencies */
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

/* Internal dependencies */
import {
  getPlaylist,
  getPlaylistTracks,
} from "~/models/entity.server";
import Collection from '~/components/Collection';
import PlaylistSummary from '~/components/Summary/PlaylistSummary';
import styles from "~/styles/routes/__main/playlist.css";

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}

type LoaderData = {
  playlist: Awaited<ReturnType<typeof getPlaylist>>;
  tracks: Awaited<ReturnType<typeof getPlaylistTracks>>;
  id: number;
};

export const loader = async ({ params }) => {
  return json<LoaderData>({
    playlist: await getPlaylist(params.id),
    tracks: await getPlaylistTracks(params.id),
    id: params.id,
  });
};


const Playlist = () => {
  const {
    playlist,
    tracks,
  } = useLoaderData() as LoaderData;
  return (
    <section className="screen playlist">
      <PlaylistSummary data={playlist} />
      <Collection
        className="trackList"
        items={!tracks.length ? [] : tracks}
      />
    </section>
  );
};

export default Playlist;
