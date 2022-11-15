interface Migration {
  version: number;
  key: string;
  migrate?: (data: any) => any;
}

export const migrations: Migration[] = [
  {
    key: '@settings',
    version: 1,
  }
];
