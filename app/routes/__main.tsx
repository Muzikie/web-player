import { Outlet } from "@remix-run/react";
import PlayerProvider from '~/context/playerContextProvider';
import MainMenu from '~/components/MainMenu';
import Player from '~/components/Player';
import styles from "~/styles/routes/__main.css";

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}

const Main = () => (
  <PlayerProvider>
    <div id="layout" className="component layout">
      <MainMenu />
      <main className="main">
      <Outlet />
      </main>
      <Player />
    </div>
  </PlayerProvider>
);

export default Main;
