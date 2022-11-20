interface Migration {
  version: number;
  key: string;
  migrate?: (data: any) => any;
}

export const MIN_STORAGE_VERSION = 1;

export const STORAGE_KEYS = {
  SETTINGS: '@SETTINGS',
  PLAYER_STATE: '@PLAYER_STATE',
};

export const migrations: Migration[] = [
  {
    key: STORAGE_KEYS.SETTINGS,
    version: MIN_STORAGE_VERSION,
  },
  {
    key: STORAGE_KEYS.PLAYER_STATE,
    version: MIN_STORAGE_VERSION,
  }
];
