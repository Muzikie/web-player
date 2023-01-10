import React from 'react';
import styles from '~/css/routes/__main/settings.css';

export function links() {
  return [{ rel: 'stylesheet', href: styles }];
}

const Settings = () => (
  <section className="screen settings">
    <h2>Settings</h2>
  </section>
);

export default Settings;
