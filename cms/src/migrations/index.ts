import * as migration_20261025_175329_initial from './20261025_175329_initial';
import * as migration_20261027_204000_add_vercel_blob_object_key from './20261027_204000_add_vercel_blob_object_key';

export const migrations = [
  {
    up: migration_20261025_175329_initial.up,
    down: migration_20261025_175329_initial.down,
    name: '20261025_175329_initial'
  },
  {
    up: migration_20261027_204000_add_vercel_blob_object_key.up,
    down: migration_20261027_204000_add_vercel_blob_object_key.down,
    name: '20261027_204000_add_vercel_blob_object_key'
  },
];
