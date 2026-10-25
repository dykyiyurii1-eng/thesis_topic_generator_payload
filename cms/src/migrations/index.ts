import * as migration_20261025_175329_initial from './20261025_175329_initial';

export const migrations = [
  {
    up: migration_20261025_175329_initial.up,
    down: migration_20261025_175329_initial.down,
    name: '20261025_175329_initial'
  },
];
