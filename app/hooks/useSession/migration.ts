interface Migration {
  version: number;
  key: string;
  migrate?: (data: any) => any;
}

export const migration: Migration = {
  key: '@session',
  version: 1,
}
